<script setup lang="ts">
import { FinanceTypeOptions } from '~/app/pocketbase-types';
import type { TFinance } from '~/composables/finance/index';


const financeList = ref<TFinance[]>([])

const totalDonations = computed<number>(() => {
  let total = 0;
  for (let donation of financeList.value) {
    if (donation.type == FinanceTypeOptions.donation) {
      total += donation.amount;
    }
  }
  return total;
});

const totalExpenses = computed<number>(() => {
  let total = 0;
  for (let expense of financeList.value) {
    if (expense.type == FinanceTypeOptions.expense) {
      total += expense.amount;
    }
  }
  return total;
});

const totalRemaining = computed<number>(() => {
  return totalDonations.value - totalExpenses.value;
})

const remainingColor = computed<string>(() => {
  let color: string = 'success';
  if (totalRemaining.value < 50) color = 'warning';
  if (totalRemaining.value <= 0) color = 'error';
  return color;
});



const loading = useLoading();
async function loadFinanceData() {
  loading.start();
  const response = await useFinance().getAll()
  loading.end();

  console.log(response)
  if (response.models) {
    financeList.value = response.models;
  }
}

onMounted(() => {
  loadFinanceData();
  useNuxtApp().$activeModalsBus.$on('finance:created', loadFinanceData)
  useNuxtApp().$activeModalsBus.$on('finance:updated', loadFinanceData)
  useNuxtApp().$activeModalsBus.$on('finance:removed', loadFinanceData)

})


</script>

<template>
  <loading-from-backend v-if="loading.isLoading.value" />
  <v-card border="lg" rounded="lg" v-else>
    <v-card-text>
      <v-row>
        <v-col cols="2">
          <v-icon size="84">mdi-safe-square-outline</v-icon>
          <span class="font-weight-bold text-h6 ma-2">Main Vault</span>
        </v-col>
        <v-divider vertical class="pa-0 ma-0"></v-divider>
        <v-col>
          <div class="d-flex flex-column py-2 justify-center" style="height: 100%;">
            <p class="font-weight-bold ma-2"> Donations : <w-usd :amount="totalDonations" /> </p>
            <p class="font-weight-bold ma-2"> Expenses : <w-usd :amount="totalExpenses" color="error" /> </p>
          </div>
        </v-col>
        <v-col cols="4">
          <p class="font-weight-bold text-h3 d-flex flex-column py-2 justify-center text-right" style="height: 100%;">
            <w-usd :amount="totalRemaining" :color="remainingColor" />
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>