<template>

  <v-dialog :model-value="show"  scrollable persistent transition="dialog-transition">
    <ProjectsFinanceRequestsUpdateRequestStatus @cancel="cancelUpdate" @saved="handleUpdate"
      :show="updateFinancilaRequestModal.isShown.value" :request="finacialRequestToUpdate" />

    <w-html-view-dialog :title="finacialRequestDetailsTitle" :show="financialREquestDetailsModal.isShown.value"
      :html="finacialRequestDetailsToShow" @close="financialREquestDetailsModal.hide" />
    <v-card rounded="">
      <v-toolbar>
        <v-toolbar-title class="font-weight-bold">
          Financial Request
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="cancel" />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text class="pa-0 ma-0">
        <v-row class="rounded-lg pa-0 ma-0">
          <v-col cols="8" xl="8" lg="7" md="7" sm="6" style="height: calc(100vh - 125px); overflow: auto;" class="elevation-12">
            <div class="border-lg py-4 rounded-lg py-8">
              <NuxtLink :to="`/hr/employees/${request.expand?.creator.id}`">
                <div class="d-flex align-center px-4">
                  <v-avatar cover size="94" rounded="lg" class="my-2 elevation-1">

                    <v-img :src="getAvatarUrl(request.expand?.creator)" alt="employee avatar image" />

                  </v-avatar>
                  <div class="d-inline-block mx-4 mt-2">
                    <span class="font-weight-bold text-nowrap">{{ request.expand?.creator.name }}</span>
                    <p class="text-grey-darken-2"> {{ request.expand?.creator.email }}</p>
                    <v-divider class="mt-2"></v-divider>
                    <div class="d-flex align-center">

                      <span class="font-weight-bold">
                        {{ request.expand?.creator.employment_position }} in ({{
                          request.expand?.creator.employment_section }})
                      </span>
                      <v-chip density="compact" variant="outlined" class="ma-2 font-weight-bold"
                        :color="getStatusColor(request.expand?.creator)">{{
                          request.expand?.creator.employment_status }}</v-chip>
                    </div>

                  </div>
                </div>
              </NuxtLink>
              <v-divider class="my-4"></v-divider>
              <div class="px-4 font-weight-bold">
                Title : {{ request.title }}
                <span class="mx-4">

                  <v-chip v-if="request.status == FinancialRequestsStatusOptions.PENDING" color="black">
                    {{
                      request.status
                    }}
                  </v-chip>
                  <v-chip v-if="request.status == FinancialRequestsStatusOptions.DECLINED" color="error"
                    prepend-icon="mdi-cancel">
                    {{ request.status }}
                  </v-chip>
                  <v-chip v-if="request.status == FinancialRequestsStatusOptions.APPROVED" prepend-icon="mdi-check"
                    color="warning">
                    {{
                      request.status
                    }}
                  </v-chip>

                  <v-chip variant="flat" v-if="request.status == FinancialRequestsStatusOptions.BILL_APPROVED"
                    prepend-icon="mdi-check-all" class="px-4" label size="large" color="success">
                    {{
                      request.status
                    }}
                  </v-chip>
                  <v-btn icon="mdi-pencil" variant="text" @click="updateStatus"></v-btn>
                </span>


                <p>
                  Last Update : <date-view :date="request.updated" :show-time="true" />
                </p>

                <p>
                  Details :
                  <v-btn color="primary" variant="text" icon="mdi-file-document-outline"
                    @click="showFinancialRequestDetails()"></v-btn>
                </p>
              </div>
              <v-divider class="my-4"></v-divider>
              <div>
                <ProjectsFinanceRequestsRequestBills :request="request" />
              </div>
            </div>
            <ProjectsFinanceRequestsItemsList :request="request" />

          </v-col>
          <v-divider vertical></v-divider>

          <v-col style="height: calc(100vh - 125px); overflow: auto;" class="elevation-12">
            <ProjectsFinanceRequestsCommityComments :request="request" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { FinancialRequestsStatusOptions, type EmployeesRecord } from '~/app/pocketbase-types';
import type { TFinancialRequest } from '~/composables/requests';


const required = true;
const props = defineProps({
  request: { required, type: Object },
  show: { required, type: Boolean }
})

const emit = defineEmits(['cancel', 'saved']);
function cancel() {
  emit('cancel')
}




const financialREquestDetailsModal = useModal();
const finacialRequestDetailsToShow = ref<string>('');
const finacialRequestDetailsTitle = ref<string>('');

function showFinancialRequestDetails() {
  finacialRequestDetailsToShow.value = props.request.details || '';
  finacialRequestDetailsTitle.value = `
    Request : ( ${props.request.title} )
  `;
  financialREquestDetailsModal.show();
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


const updateFinancilaRequestModal = useModal();
const finacialRequestToUpdate = ref<TFinancialRequest | null>(null);

function updateStatus() {
  finacialRequestToUpdate.value = Object.assign({}, props.request);
  updateFinancilaRequestModal.show();
}

function cancelUpdate() {
  updateFinancilaRequestModal.hide();
  // staffToUpdate.value = null;
}

function handleUpdate() {
  updateFinancilaRequestModal.hide();
  emit('cancel')
}

</script>