<template>
  <advances-create :show="addAdvanceModal.isShown.value" @cancel="addAdvanceModal.hide" @saved="addAdvanceModal.hide" />

  <advances-update :advance="advanceToUpdate" :show="updateAdvanceModal.isShown.value" @cancel="updateAdvanceModal.hide"
    @saved="updateAdvanceModal.hide" />

  <AdvancesPaymentsList :advance="advanceToShowPayments" :show="showAdvancePaymentsModal.isShown.value"
    @close="showAdvancePaymentsModal.hide" />

  <w-html-view-dialog :title="advanceDetailsTitle" :show="advanceDetailsModal.isShown.value" :html="advanceDetailsToShow"
    @close="advanceDetailsModal.hide" />

  <div>
    <v-card-actions>
      <span class="font-weight-bold text-h6">
        Advances List
      </span>
      <v-spacer></v-spacer>
      <v-btn @click="addAdvanceModal.show" color="primary" variant="tonal" size="large" rounded="pill" class="px-4">
        <v-icon>mdi-invoice-plus-outline</v-icon>
        <span class="mx-2"></span>
        Add Advance
      </v-btn>
    </v-card-actions>

    <v-divider class="mt-4"></v-divider>
    <v-data-table :loading="loading.isLoading.value" :headers="headers" :items="advancesList" item-key="id">

      <template v-slot:item.employee="{ item }">
        <NuxtLink :to="`/hr/employees/${item.employee}`">
          <div class="d-flex align-center">
            <v-avatar cover size="64" rounded="lg" class="ma-2 elevation-1">
              <v-img :src="getAvatarUrl(item?.expand?.employee)" alt="employee avatar image" />
            </v-avatar>

            <div class="d-inline-block mx-4">
              <span class="font-weight-bold text-nowrap">{{ item?.expand?.employee?.name }}</span>
              <p class="text-grey-darken-2"> {{ item?.expand?.employee?.email }}</p>

              <div>
                <v-chip density="compact" variant="outlined" size="small" class="my-1 mx-auto font-weight-bold"
                  :color="getStatusColor(item?.expand?.employee)">
                  {{ getStatus(item?.expand?.employee) }}
                </v-chip>
              </div>
            </div>
          </div>
        </NuxtLink>
      </template>

      <template v-slot:item.amount="{ item }">
        <w-usd color="indigo" :amount="item.amount" />
      </template>

      <template v-slot:item.payed="{ item }">
        <w-usd :amount="item.payed" />
      </template>

      <template v-slot:item.remaining="{ item }">
        <w-usd :color="calcRemaining(item) > 0 ? 'red' : 'back'" :amount="calcRemaining(item)" />
      </template>

      <template v-slot:item.status="{ item }">
        <v-icon color="warning" v-if="calcRemaining(item) > 0" size="32">mdi-information mdi-rotate-180</v-icon>
        <v-icon color="green" v-else size="32">mdi-check-all</v-icon>

      </template>


      <template v-slot:item.actions="{ item }">
        <div class="my-2">
          <v-btn color="primary" variant="text" icon="mdi-file-document-outline" @click="showAdvanceDetails(item)" />

          <v-btn color="black" @click="setAdvanceToShowPayments(item)" variant="text" rounded="lg"
            icon="mdi-invoice-text" />

          <v-btn class="mx-2" @click="setAdvanceToUpdate(item)" color="info" variant="tonal" icon="mdi-pencil"
            rounded="lg" />

          <v-btn color="error" variant="text" icon="mdi-delete" @click="confirmRemove(item)"></v-btn>
        </div>

      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import { type TAdvance } from "~/composables/advances/index";


const headers = [
  { key: 'employee', title: 'Employee' },
  { key: 'amount', title: 'Amount' },
  { key: 'payed', title: 'Payed' },
  { key: 'remaining', title: 'Remaining' },
  { key: 'status', title: 'Status', align: 'end' },
  { key: 'actions', title: 'Actions', align: 'end' },
];

const Advances = useEmployeesAdvances();

const advancesList = ref<TAdvance[]>([])

const loading = useLoading();
async function loadAllAdvances() {

  loading.start();
  const { models } = await Advances.get.all();
  loading.end();

  if (models) {
    advancesList.value = models;
  }

}

function getStatus(employee: any) {
  if (!employee) return '';
  const status = employee.employment_status || ''
  return status;
}

function getStatusColor(employee: any) {
  let color = '';
  const status = getStatus(employee)
  switch (status) {
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


function getAvatarUrl(person: any) {
  return usePocketBase().files.getUrl(person, person.avatar || '');
}

function calcRemaining(advance: TAdvance) {
  return Number(advance.amount) - Number(advance.payed);
}


onMounted(() => {
  loadAllAdvances();
  useNuxtApp().$activeModalsBus.$on('advances:created', loadAllAdvances);
  useNuxtApp().$activeModalsBus.$on('advances:updated', async () => {
    await loadAllAdvances();
    for (let advance of advancesList.value) {
      if (advance.id == advanceToShowPayments.value?.id) {
        advanceToShowPayments.value = Object.assign({}, advance);
        break;
      }
    }
  });
  useNuxtApp().$activeModalsBus.$on('advances:removed', loadAllAdvances);
});

const addAdvanceModal = useModal();

const showAdvancePaymentsModal = useModal();
const advanceToShowPayments = ref<TAdvance | null>(null);

function setAdvanceToShowPayments(advance: TAdvance) {
  advanceToShowPayments.value = Object.assign({}, advance);
  showAdvancePaymentsModal.show();
}

const updateAdvanceModal = useModal();
const advanceToUpdate = ref<TAdvance | null>(null);

function setAdvanceToUpdate(advance: TAdvance) {
  advanceToUpdate.value = Object.assign({}, advance);
  advanceToUpdate.value.employee = advanceToUpdate.value.expand?.employee;
  updateAdvanceModal.show();
}

const advanceDetailsModal = useModal();
const advanceDetailsToShow = ref<string>('');
const advanceDetailsTitle = ref<string>('');

function showAdvanceDetails(advance: TAdvance) {
  advanceDetailsToShow.value = advance.statement || '';
  advanceDetailsTitle.value = advance.amount.toFixed(2) + ' USD ____ ' + advance.expand?.employee.name;
  advanceDetailsModal.show();
}

const Remove = useConfirmRemove();
async function confirmRemove(advance: TAdvance) {
  const { isConfirmed } = await Remove.confirm();
  if (isConfirmed) {
    await Remove.doRemove(async () => {
      await Advances.remove(advance)
      useNuxtApp().$activeModalsBus.$emit('advances:removed');

    });
  }
}
</script>

<style></style>