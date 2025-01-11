<template>
  <w-html-view-dialog :title="finacialRequestDetailsTitle" :show="financialREquestDetailsModal.isShown.value"
    :html="finacialRequestDetailsToShow" @close="financialREquestDetailsModal.hide" />

  <ProjectsFinancePurchasesCreateRequest @cancel="addFinancialRequestModal.hide" @saved="addFinancialRequestModal.hide"
    :show="addFinancialRequestModal.isShown.value" :project="project" />

  <ProjectsFinancePurchasesUpdateRequest @cancel="cancelUpdate" @saved="handleUpdate"
    :show="updateFinancilaRequestModal.isShown.value" :request="finacialRequestToUpdate" />


  <ProjectsFinancePurchasesView @cancel="cancelView" :show="viewFinancilaRequestModal.isShown.value"
    :request="finacialRequestToView" />

  <v-card flat>
    <v-toolbar color="transparent">
      <v-toolbar-title class="font-weight-bold">
        Purchases Requests
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" variant="tonal" class="mx-2" rounded="pill" @click="addFinancialRequestModal.show">
        <v-icon>mdi-plus-thick</v-icon>
        <span class="mx-2">
          Add Purchase
        </span>
      </v-btn>
    </v-toolbar>
    <div>
      <v-data-table :loading="loading.isLoading.value" :headers="headers" :items="requestsList" item-key="id">
        <template v-slot:item.creator="{ item }">
          <NuxtLink :to="`/hr/employees/${item.expand?.creator.id}`">
            <div class="d-flex align-center">
              <v-avatar cover size="94" rounded="lg" class="my-2 elevation-1">

                <v-img :src="getAvatarUrl(item.expand?.creator)" alt="employee avatar image" />

              </v-avatar>
              <div class="d-inline-block mx-4 mt-2">
                <span class="font-weight-bold text-nowrap">{{ item.expand?.creator.name }}</span>
                <p class="text-grey-darken-2"> {{ item.expand?.creator.email }}</p>
                <v-divider class="mt-2"></v-divider>
                <div class="d-flex align-center">

                  <span class="font-weight-bold">
                    {{ item.expand?.creator.employment_position }} in ({{ item.expand?.creator.employment_section }})
                  </span>
                  <v-chip density="compact" variant="outlined" class="ma-2 font-weight-bold"
                    :color="getStatusColor(item.expand?.creator)">{{
                      item.expand?.creator.employment_status }}</v-chip>
                </div>

              </div>
            </div>
          </NuxtLink>
        </template>
        <template v-slot:item.title="{ item }">

          <v-btn @click="setFinacialRequestToView(item)" color="blue" variant="text">
            <span class="font-weight-black text-capitalize">
              {{ item.title }}
            </span>
          </v-btn>
        </template>

        <template v-slot:item.price="{ item }">

          <w-usd :amount="item.price" />
          
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip v-if="item.status == PurchasesStatusOptions.PENDING" color="black">
            {{
              item.status
            }}
          </v-chip>
          <v-chip v-if="item.status == PurchasesStatusOptions.DECLINED" color="error" prepend-icon="mdi-cancel">
            {{ item.status }}
          </v-chip>
          <v-chip v-if="item.status == PurchasesStatusOptions.APPROVED" prepend-icon="mdi-check" color="warning">
            {{
              item.status
            }}
          </v-chip>

          <v-chip variant="flat" v-if="item.status == PurchasesStatusOptions.BILL_APPROVED" prepend-icon="mdi-check-all"
            class="px-4" label size="large" color="success">
            {{
              item.status
            }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="my-2">
            <v-btn color="primary" variant="text" icon="mdi-file-document-outline"
              @click="showFinancialRequestDetails(item)"></v-btn>

            <v-btn class="mx-2" color="info" variant="tonal" icon="mdi-pencil" rounded="lg"
              @click="setFinacialRequestToUpdate(item)"></v-btn>

            <v-btn color="error" variant="text" icon="mdi-delete" @click="confirmRemove(item)"></v-btn>
          </div>
        </template>
      </v-data-table>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { PurchasesStatusOptions, type EmployeesRecord } from '~/app/pocketbase-types';
import type { TPurchaseRequest } from '~/composables/purchases/index';


const props = defineProps(['project'])
const addFinancialRequestModal = useModal();


const headers = [
  { title: 'Title', key: 'title' },
  { title: 'Creator', key: 'creator' },
  { title: 'Price', key: 'price' },
  { title: 'Status', key: 'status', align: 'end' },
  { title: 'Actions', key: 'actions', align: 'end' },
]

const requestsList = ref<TPurchaseRequest[]>([])

const loading = useLoading();
async function loadFinancialRequests() {
  loading.start();
  const response = await usePurchasesRequests().get.all(props.project.id)
  loading.end();

  console.log(response)
  if (response.models) {
    requestsList.value = response.models;
  }
}

onMounted(() => {
  loadFinancialRequests();
  useNuxtApp().$activeModalsBus.$on('projects:purchases:created', loadFinancialRequests)
  useNuxtApp().$activeModalsBus.$on('projects:purchases:updated', loadFinancialRequests)
  useNuxtApp().$activeModalsBus.$on('projects:purchases:removed', loadFinancialRequests)

})


const Remove = useConfirmRemove();
async function confirmRemove(request: TPurchaseRequest) {
  const { isConfirmed } = await Remove.confirm();
  if (isConfirmed) {
    await Remove.doRemove(async () => {
      await usePurchasesRequests().remove(request)
      useNuxtApp().$activeModalsBus.$emit('projects:purchases:removed');

    });
  }
}



const updateFinancilaRequestModal = useModal();
const finacialRequestToUpdate = ref<TPurchaseRequest | null>(null);

function setFinacialRequestToUpdate(request: TPurchaseRequest) {
  finacialRequestToUpdate.value = Object.assign({}, request);
  updateFinancilaRequestModal.show();
}

function cancelUpdate() {
  updateFinancilaRequestModal.hide();
  // staffToUpdate.value = null;
}

function handleUpdate() {
  updateFinancilaRequestModal.hide();
}


const financialREquestDetailsModal = useModal();
const finacialRequestDetailsToShow = ref<string>('');
const finacialRequestDetailsTitle = ref<string>('');

function showFinancialRequestDetails(line: TPurchaseRequest) {
  finacialRequestDetailsToShow.value = line.details || '';
  finacialRequestDetailsTitle.value = `
    Purchase: ( ${line.title} )
  `;
  financialREquestDetailsModal.show();
}


const viewFinancilaRequestModal = useModal();
const finacialRequestToView = ref<TPurchaseRequest | null>(null);

function setFinacialRequestToView(request: TPurchaseRequest) {
  finacialRequestToView.value = Object.assign({}, request);
  viewFinancilaRequestModal.show();
}

function cancelView() {
  viewFinancilaRequestModal.hide();
  // staffToview.value = null;
}


function getStatusColor(employee: EmployeesRecord) {
  let color = '';
  switch (employee.employment_status) {
    case "Active":
      color = 'success'
      break;
    case "Suspended":
      color = 'error'
      break;
    case "Resigned":
      color = 'black';
      break;
    case "In_Vacation":
      color = "warning";
      break;
  }
  return color;
};


function getAvatarUrl(employee: EmployeesRecord) {
  return usePocketBase().files.getUrl(employee, employee.avatar || '');
}
</script>