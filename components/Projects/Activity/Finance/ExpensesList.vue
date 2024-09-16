<template>
  <w-html-view-dialog :title="financeStatementTitle" :show="financeStatementModal.isShown.value"
    :html="financeStatementToShow" @close="financeStatementModal.hide" />

  <projects-activity-finance-update-finance @cancel="cancelUpdate" @saved="handleUpdate"
    :show="updateFinanceModal.isShown.value" :finance="financeToUpdate || {}" />
  <div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <div class="font-weight-black text-h6">
        Total :
        <w-usd :amount="totalAmount" />
      </div>
    </v-card-actions>
    <v-divider></v-divider>
    <v-data-table :loading="loading.isLoading.value" :headers="headers" :items="donationsList" item-key="id">
      <template v-slot:item.fund_facility="{ item }">
        <span class="font-weight-black text-capitalize">
          {{ item.fund_facility }}
        </span>
      </template>
      <template v-slot:item.amount="{ item }">
        <w-usd class="font-weight-black text-capitalize" :amount="item.amount" />
      </template>
      <template v-slot:item.updated="{ item }">
        <date-view class="font-weight-bold" :show-time="true" :date="item.updated" />
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="my-2">
          <v-btn color="primary" variant="text" icon="mdi-file-document-outline"
            @click="showFinanceStatement(item)"></v-btn>

          <v-btn class="mx-2" color="info" variant="tonal" icon="mdi-pencil" rounded="lg"
            @click="setFinanceToUpdate(item)"></v-btn>

          <v-btn color="error" variant="text" icon="mdi-delete" @click="confirmRemove(item)"></v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import { type TActivityFinance } from "~/composables/activityFinance/index";
const props = defineProps(['activity'])


const headers = [
  { title: 'Donor', key: 'fund_facility' },
  { title: 'Amount', key: 'amount' },
  { title: 'Date', key: 'updated' },
  { title: 'Actions', key: 'actions', align: 'end' },

]


const donationsList = ref<TActivityFinance[]>([])

const totalAmount = computed<Number>(() => {
  let total = 0;
  for (let donation of donationsList.value) {
    total += donation.amount;
  }
  return total;
});


const loading = useLoading();
async function loadExpenses() {
  loading.start();
  const response = await useActivityFinance().getExpenses(props.activity)
  loading.end();

  console.log(response)
  if (response.models) {
    donationsList.value = response.models;
  }
}

onMounted(() => {
  loadExpenses();
  useNuxtApp().$activeModalsBus.$on('activities:finance:created', loadExpenses)
  useNuxtApp().$activeModalsBus.$on('activities:finance:updated', loadExpenses)
  useNuxtApp().$activeModalsBus.$on('activities:finance:removed', loadExpenses)

})

const Remove = useConfirmRemove();
async function confirmRemove(finance: TActivityFinance) {
  const { isConfirmed } = await Remove.confirm();
  if (isConfirmed) {
    await Remove.doRemove(async () => {
      await useActivityFinance().remove(finance.id)
      useNuxtApp().$activeModalsBus.$emit('activities:finance:removed');

    });
  }
}


const updateFinanceModal = useModal();
const financeToUpdate = ref<TActivityFinance | null>(null);

function setFinanceToUpdate(finance: TActivityFinance) {
  financeToUpdate.value = Object.assign({}, finance);
  updateFinanceModal.show();
}

function cancelUpdate() {
  updateFinanceModal.hide();
  // staffToUpdate.value = null;
}

function handleUpdate() {
  updateFinanceModal.hide();
}



const financeStatementModal = useModal();
const financeStatementToShow = ref<string>('');
const financeStatementTitle = ref<string>('');

function showFinanceStatement(finance: TActivityFinance) {
  financeStatementToShow.value = finance.statement || '';
  financeStatementTitle.value = `
    Statement : ( ${finance.type} )
  `;
  financeStatementModal.show();
}


</script>

<style></style>