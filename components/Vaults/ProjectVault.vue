<script setup lang="ts">
import { FinanceTypeOptions, FinancialRequestsStatusOptions, ProjectFinanceTypeOptions, PurchasesStatusOptions } from '~/app/pocketbase-types';
import type { TFinance } from '~/composables/finance/index';
import type { TProjectFinance } from '~/composables/projectFinance/index';
import type { TPurchaseRequest } from '~/composables/purchases';
import type { TFinancialRequest } from '~/composables/requests';
import type { TFinancialRequestsItem } from '~/composables/requestsItems';

const props = defineProps({
  project: {
    required: true,
    type: Object
  },
  hideHeader: {
    required: false,
    type: Boolean,
    default: false,
  }
})

// ---------------- Donations ------------------//

const donationsList = ref<TProjectFinance[]>([])
async function loadDonations() {
  const response = await useProjectFinance().getDonations(props.project)

  if (response.models) {
    donationsList.value = response.models;
  }
}

const totalDonations = computed<number>(() => {
  let total = 0;
  for (let donation of donationsList.value) {
    if (donation.type == ProjectFinanceTypeOptions.donation) {
      total += donation.amount;
    }
  }
  return total;
});


const totalFees = computed<number>(() => {
  let total = 0;
  for (let donation of donationsList.value) {
    if (donation.type == ProjectFinanceTypeOptions.donation) {
      total += donation.transaction_fees;
    }
  }
  return total;
})

// ---------------- END Donations ------------------//


// ---------------- Purchases ------------------//

const purchasesList = ref<TPurchaseRequest[]>([])
async function loadPurchases() {
  const response = await usePurchasesRequests().get.all(props.project.id)

  if (response.models) {
    purchasesList.value = response.models;
  }
}

const totalPurchases = computed<number>(() => {
  let total = 0;
  for (let purchase of purchasesList.value) {
    if (purchase.status == PurchasesStatusOptions.DECLINED) continue;
    total += purchase.price;
  }
  return total;
});

const totalBillApprovedPurchases = computed<number>(() => {
  let total = 0;
  for (let purchase of purchasesList.value) {
    if (purchase.status == PurchasesStatusOptions.BILL_APPROVED) {
      total += purchase.price;
    }
  }
  return total;
});

// ---------------- END Purchases ------------------//

// ---------------- Financial Requests ------------------//
const requestsList = ref<TFinancialRequest[]>([])
const itemsList = ref<TFinancialRequestsItem[]>([]);
const billApprovedItemsList = ref<TFinancialRequestsItem[]>([]);

async function loadFinancialRequests() {
  const response = await useFinancialRequests().get.all(props.project.id)

  if (response.models) {
    requestsList.value = response.models;
    for (let request of requestsList.value) {
      if (request.status == FinancialRequestsStatusOptions.DECLINED) continue;

      const { models } = await useFinancialRequestsItems().get.all(request.id)
      if (models) {
        itemsList.value = itemsList.value.concat(models);
        if (request.status == FinancialRequestsStatusOptions.BILL_APPROVED) {
          billApprovedItemsList.value = billApprovedItemsList.value.concat(models);
        }
      }

    }
  }
}

const totalFinancialRequests = computed<number>(() => {
  let total = 0;
  for (let item of itemsList.value) {
    total = item.total_price_in_usd;
  }
  return total;
})

const totalBillApprovedFinancialRequests = computed<number>(() => {
  let total = 0;
  for (let item of billApprovedItemsList.value) {
    total = item.total_price_in_usd;
  }
  return total;
})


// ---------------- END Financial Requests ------------------//



// ---------------- APP ------------------//

const totalExpenses = computed<number>(() => {
  return totalFinancialRequests.value + totalPurchases.value;
});

const totalBillApprovedExpenses = computed<number>(() => {
  return totalBillApprovedFinancialRequests.value + totalBillApprovedPurchases.value;
});

const totalUsed = computed<number>(() => {
  return totalBillApprovedExpenses.value;
});

const totalInHold = computed<number>(() => {
  return totalExpenses.value - totalUsed.value;
});

const totalInVault = computed<number>(() => {
  return totalDonations.value - totalUsed.value;
});

const totalFree = computed<number>(() => {
  return totalDonations.value - totalExpenses.value;
})


const totalRemaining = computed<number>(() => {
  return totalDonations.value - totalExpenses.value;
})

const totalInVaultColor = computed<string>(() => {
  let color: string = 'success';
  if (totalInVault.value < 50) color = 'warning';
  if (totalInVault.value <= 0) color = 'error';
  return color;
});



const loading = useLoading();
async function loadFinanceData() {
  loading.start();

  await loadDonations();
  await loadPurchases();
  await loadFinancialRequests();

  loading.end();

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
  <v-card border="lg" rounded="xl" class="my-8 py-0" v-else>
    <v-card-text class="pa-0 ma-0">
      <v-row>
        <v-col>
          <div class="pa-4 pb-0 d-flex flex-row justify-space-between w-100">
            <div >
              <div v-if="!hideHeader">
                <v-icon size="36">mdi-safe</v-icon>
                <span class="font-weight-bold ">
                  <nuxt-link class="py-2 px-2 text-h6" :to="`/projects/${project?.id}`">
                    Project :
  
                    <span class="text-blue mx-2">
                      {{ project?.title }}
                    </span>
                  </nuxt-link>
                  |
                  <span class="py-2 px-4">
                    <v-icon>mdi-map-marker</v-icon>
                    {{ project?.place || 'N/A' }}
                  </span>
                  |
                  <span class="py-2 px-6">
                    <DateView :date="project?.starting_date" />
                    --
                    <DateView :date="project?.end_date" />
                  </span>
                </span>
              </div>
            </div>
            
            <div class=" font-weight-bold text-h6">
              Balance :
              <w-usd :amount="totalDonations - totalBillApprovedExpenses" :color="totalInVaultColor"></w-usd>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-divider vertical class="pa-0 ma-0"></v-divider>
        <v-col class="pt-0 pb-12 px-0 my-0">
          <p class="font-weight-bold pa-2 px-4 pt-3 bg-grey-lighten-3 text-center">Expenses Summary</p>
          <v-divider></v-divider>
          <pre class="d-flex px-4 flex-column justify-center" style="height: 100%;">
            <!-- <p class=" ma-2"> {{ `Fees : `.padEnd(40, '.') }} <w-usd :amount="totalFees" color="black" /></p> -->
            <p class=" ma-2"> {{ `Financial Requests Total : `.padEnd(40, '.') }} <w-usd :amount="totalFinancialRequests" color="black" /></p>
            <p class=" ma-2"> {{ `Financial Requests Bill Approved : `.padEnd(40, '.') }} <w-usd :amount="totalBillApprovedFinancialRequests" color="red" /></p>
            <v-divider class="mx-2"></v-divider>
            <p class=" ma-2"> {{ `Purchases Total : `.padEnd(40, '.') }} <w-usd color="black" :amount="totalPurchases" /></p>
            <p class=" ma-2"> {{ `Purchases Bill Approved : `.padEnd(40, '.') }} <w-usd color="red" :amount="totalBillApprovedPurchases" /></p>
            <v-divider class="mx-2"></v-divider>
            <p class=" ma-2"> {{ `Total Expenses : `.padEnd(40, '.') }} <w-usd :amount="totalExpenses" color="black"/></p>
            <p class=" ma-2"> {{ `Total Bill Approved Expenses : `.padEnd(40, '.') }} <w-usd :amount="totalBillApprovedExpenses" color="red" /></p>
          </pre>
        </v-col>
        <v-divider vertical class="pa-0 ma-0" color="black-darken-2"></v-divider>
        <v-col class="pt-0 pb-12 px-0 my-0">
          <p class="font-weight-bold pa-2 pt-3 px-4  bg-grey-lighten-3 text-center">Vault Summary</p>
          <v-divider></v-divider>
          <pre class="d-flex px-4 flex-column justify-center" style="height: 100%;">
            <p class=" ma-2"> {{ `Donations : `.padEnd(40, '.') }} <w-usd :amount="totalDonations" /></p>
            <p> </p>
            <v-divider class="mx-2"></v-divider>
            <p class=" ma-2"> {{ `Total Used : `.padEnd(40, '.') }} <w-usd color="red" :amount="totalUsed" /></p>
            <p class=" ma-2"> {{ `On Hold : `.padEnd(40, '.') }} <w-usd color="red" :amount="totalInHold" /></p>
            <v-divider class="mx-2"></v-divider>
            <p class=" ma-2"> {{ `Remaining In Vault: `.padEnd(40, '.') }} <w-usd color="black" :amount="totalInVault" /></p>
            <p class=" ma-2"> {{ `Free : `.padEnd(40, '.') }} <w-usd color="black" :amount="totalFree" /></p>
          </pre>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>