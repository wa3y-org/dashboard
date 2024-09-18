<template>
  <w-html-view-dialog :title="financeStatementTitle" :show="financeStatementModal.isShown.value"
    :html="financeStatementToShow" @close="financeStatementModal.hide" />

    <finance-update-finance @cancel="cancelUpdate" @saved="handleUpdate"
    :show="updateFinanceModal.isShown.value" :finance="financeToUpdate"  />
  <div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <div class="font-weight-black text-h6">
        Total :
        <w-usd :amount="totalAmount" />
      </div>
    </v-card-actions>
    <v-divider></v-divider>
    <v-data-table :loading="loading.isLoading.value" :headers="headers" :items="expensesList" item-key="id">
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
          <v-btn color="primary" variant="text" icon="mdi-file-document-outline" @click="showFinanceStatement(item)"></v-btn>

          <v-btn class="mx-2" color="info" variant="tonal" icon="mdi-pencil" rounded="lg" @click="setFinanceToUpdate(item)"></v-btn>

          <v-btn color="error" variant="text" icon="mdi-delete" @click="confirmRemove(item)"></v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import { type TFinance } from "~/composables/finance/index";



const headers = [
  { title: 'Beneficial', key: 'fund_facility' },
  { title: 'Amount', key: 'amount' },
  { title: 'Date', key: 'updated' },
  { title: 'Actions', key: 'actions', align: 'end' },

]


const expensesList = ref<TFinance[]>([])

const totalAmount = computed<Number>(() => {
  let total = 0;
  for (let expense of expensesList.value) {
    total += expense.amount;
  }
  return total;
});


const loading = useLoading();
async function loadExpenses() {
  loading.start();
  const response = await useFinance().getExpenses()
  loading.end();

  console.log(response)
  if (response.models) {
    expensesList.value = response.models;
  }
}

onMounted(() => {
  loadExpenses();
  useNuxtApp().$activeModalsBus.$on('finance:created', loadExpenses)
  useNuxtApp().$activeModalsBus.$on('finance:updated', loadExpenses)
  useNuxtApp().$activeModalsBus.$on('finance:removed', loadExpenses)

})

const Remove = useConfirmRemove();
async function confirmRemove(finance: TFinance) {
  const { isConfirmed } = await Remove.confirm();
  if (isConfirmed) {
    await Remove.doRemove(async () => {
      await useFinance().remove(finance.id)
      useNuxtApp().$activeModalsBus.$emit('finance:removed');

    });
  }
}


const updateFinanceModal = useModal();
const financeToUpdate = ref<TFinance | null>(null);

function setFinanceToUpdate(finance: TFinance) {
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

function showFinanceStatement(finance: TFinance) {
  financeStatementToShow.value = finance.statement || '';
  financeStatementTitle.value = `
    Statement : ( ${finance.type} )
  `;
  financeStatementModal.show();
}
</script>

<style></style>