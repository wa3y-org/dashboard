<template>
  <w-html-view-dialog :title="finacialRequestDetailsTitle" :show="financialREquestDetailsModal.isShown.value"
    :html="finacialRequestDetailsToShow" @close="financialREquestDetailsModal.hide" />

  <ProjectsFinanceRequestsCreateRequest @cancel="addFinancialRequestModal.hide" @saved="addFinancialRequestModal.hide"
    :show="addFinancialRequestModal.isShown.value" :project="project" />

  <ProjectsFinanceRequestsUpdateRequest @cancel="cancelUpdate" @saved="handleUpdate"
    :show="updateFinancilaRequestModal.isShown.value" :request="finacialRequestToUpdate" />


  <ProjectsFinanceRequestsView @cancel="cancelView" :show="viewFinancilaRequestModal.isShown.value"
    :request="finacialRequestToView" />

  <v-card flat>
    <v-toolbar color="transparent">
      <v-toolbar-title class="font-weight-bold">
        Financial Requests
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="blue" variant="tonal" class="mx-2" rounded="pill" @click="addFinancialRequestModal.show">
        <v-icon>mdi-plus-thick</v-icon>
        <span class="mx-2">
          Add Request
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

        <template v-slot:item.status="{ item }">
          <v-chip v-if="item.status == FinancialRequestsStatusOptions.PENDING" color="black">
            {{
              item.status
            }}
          </v-chip>
          <v-chip v-if="item.status == FinancialRequestsStatusOptions.DECLINED" color="error" prepend-icon="mdi-cancel">
            {{ item.status }}
          </v-chip>
          <v-chip v-if="item.status == FinancialRequestsStatusOptions.APPROVED" prepend-icon="mdi-check"
            color="warning">
            {{
              item.status
            }}
          </v-chip>

          <v-chip variant="flat" v-if="item.status == FinancialRequestsStatusOptions.BILL_APPROVED"
            prepend-icon="mdi-check-all" class="px-4" label size="large"color="success">
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
import { FinancialRequestsStatusOptions, type EmployeesRecord } from '~/app/pocketbase-types';
import type { TFinancialRequest } from '~/composables/requests';


const props = defineProps(['project'])
const addFinancialRequestModal = useModal();


const headers = [
  { title: 'Title', key: 'title' },
  { title: 'Creator', key: 'creator' },
  { title: 'Status', key: 'status', align: 'end' },
  { title: 'Actions', key: 'actions', align: 'end' },
]

const requestsList = ref<TFinancialRequest[]>([])

const loading = useLoading();
async function loadFinancialRequests() {
  loading.start();
  const response = await useFinancialRequests().get.all(props.project.id)
  loading.end();

  console.log(response)
  if (response.models) {
    requestsList.value = response.models;
  }
}

onMounted(() => {
  loadFinancialRequests();
  useNuxtApp().$activeModalsBus.$on('projects:financial_requests:created', loadFinancialRequests)
  useNuxtApp().$activeModalsBus.$on('projects:financial_requests:updated', loadFinancialRequests)
  useNuxtApp().$activeModalsBus.$on('projects:financial_requests:removed', loadFinancialRequests)

})


const Remove = useConfirmRemove();
async function confirmRemove(request: TFinancialRequest) {
  const { isConfirmed } = await Remove.confirm();
  if (isConfirmed) {
    await Remove.doRemove(async () => {
      await useFinancialRequests().remove(request)
      useNuxtApp().$activeModalsBus.$emit('projects:financial_requests:removed');

    });
  }
}



const updateFinancilaRequestModal = useModal();
const finacialRequestToUpdate = ref<TFinancialRequest | null>(null);

function setFinacialRequestToUpdate(request: TFinancialRequest) {
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

function showFinancialRequestDetails(line: TFinancialRequest) {
  finacialRequestDetailsToShow.value = line.details || '';
  finacialRequestDetailsTitle.value = `
    Line : ( ${line.title} )
  `;
  financialREquestDetailsModal.show();
}


const viewFinancilaRequestModal = useModal();
const finacialRequestToView = ref<TFinancialRequest | null>(null);

function setFinacialRequestToView(request: TFinancialRequest) {
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