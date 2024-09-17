<template>
  <v-dialog :model-value="show" scrollable persistent :overlay="false" max-width="1080px" transition="dialog-transition">
    <v-card rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar color="transparent">
        <v-toolbar-title>
          <v-icon>mdi-invoice-list</v-icon>
          <span class="mx-2 font-weight-bold">
            Employee Payments

          </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-chip size="large" class="px-1">
          <div class="">
            <v-icon color="warning" v-if="calcRemaining(advance) > 0" size="32">mdi-information mdi-rotate-180</v-icon>
            <v-icon color="green" v-else size="28">mdi-check-all</v-icon>
          </div>
          <span class="mx-2">
            <w-usd :amount="advance.amount" />
          </span>
        </v-chip>
        <v-btn color="error" icon="mdi-close" @click="cancel" class="mx-2" />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text class="mb-4">
        <div
          class="d-flex pa-4 my-4 rounded-lg font-weight-bold border-lg border-success align-center justify-space-between">
          <div>
            Amount: <w-usd :amount="advance.amount" />
          </div>
          <v-divider vertical></v-divider>
          <div>
            Payed: <w-usd :amount="advance.payed" />
          </div>
          <v-divider vertical></v-divider>
          <div>
            Remaining:
            <w-usd :color="calcRemaining(advance) > 0 ? 'red' : 'back'" :amount="calcRemaining(advance)" />

          </div>
        </div>
        <div>
          <advances-payments-create v-if="calcRemaining(advance) > 0" :advance="advance" @saved="loadPayments" />
          <v-divider class="my-12">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-divider>
          <div class="font-weight-bold ma-2">
            Payments History
          </div>
          <div v-if="paymentsList.length <= 0"
            class="text-center font-weight-bold my-4 pa-4 text-grey border border-dashed border-md rounded-lg">
            <p class="my-2">
              No Payments yet
            </p>
            <p class="my-2">
              Add Payment from above
            </p>
          </div>
          <div class="my-4"></div>
          <v-expansion-panels>
            <v-expansion-panel v-for="payment of paymentsList" :key="payment.id" class="border rounded-lg elevation-1">
              <v-expansion-panel-title class="font-size-black text-h6">
                <w-usd :amount="payment.amount" />
                <v-spacer></v-spacer>
                <div class="font-weight-regular text-grey text-body-1 mx-2">
                  <date-view :date="payment.created" :show-time="true" />
                </div>
              </v-expansion-panel-title>
              <v-divider></v-divider>
              <v-expansion-panel-text>
                <w-html-view :html="payment.statement" />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { type TAdvance } from "~/composables/advances/index";

const props = defineProps(['show', 'advance'])
const emit = defineEmits(['close'])

function cancel() {
  emit('close')
}

const Advances = useEmployeesAdvances();

const paymentsList = ref<TAdvance[]>([]);

const loading = useLoading();

async function loadPayments() {
  loading.start();
  const { models } = await Advances.get.payments(props.advance);
  loading.end();

  if (models) {
    paymentsList.value = models;
  }
}

onMounted(loadPayments);
watch(() => props.show, () => {
  if (props.show) {
    paymentsList.value = [];
    loadPayments();
  }
})

function calcRemaining(advance: TAdvance) {
  return Number(advance.amount) - Number(advance.payed);
}
</script>

<style></style>