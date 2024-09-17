<template>
  <div>
    <v-expansion-panels v-model="addPaymentPanel" :multiple="false">
      <v-expansion-panel class="border border-lg  border-primary rounded-lg text-primary">
        <v-expansion-panel-title class="font-size-black text-h6">
          <v-icon>mdi-plus-circle</v-icon>
          <span class="mx-2"></span>
          Add Payment
        </v-expansion-panel-title>
        <v-divider></v-divider>
        <v-expansion-panel-text class="py-4">
          <number-field v-model="payment.amount" :errors="validationErrors.amount" name="amount"
            placeholder="Enter payed amount" :props="{
              min: 1,
              suffix: 'USD',
              max: calcRemaining(advance)
            }" />
          <div class="my-4"></div>
          <text-editor v-model="payment.statement" :errors="validationErrors.statement" name="Statement" />
        </v-expansion-panel-text>
        <v-expansion-panel-text>
          <div v-if="backendError.error && backendError.hasError" class="my-4">
            <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error"
              v-if="backendError.hasError" />
          </div>
          <v-card-actions class="pa-4">
            <v-alert type="error" :value="true" variant="text" v-if="Errors.hasError(validationErrors)">
              Input Validation Error
            </v-alert>
            <v-spacer></v-spacer>
            <save-cancel-btn :loading="loading.isLoading.value" @save="save" />
          </v-card-actions>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts" setup>
import { type TAdvance } from "~/composables/advances/index";

const props = defineProps(['advance'])
const emit = defineEmits(['saved'])

const addPaymentPanel = ref();

const payment = ref({
  amount: null,
  statement: null
})

const Advances = useEmployeesAdvances();

const isFirstAttempt = ref(true);
const validationErrors = computed(() => {
  if (isFirstAttempt.value) return {};
  return Advances.validatePayment(payment.value);
})

const Errors = useErrors();
const backendError = useBackendError();

const loading = useLoading();
async function save() {
  isFirstAttempt.value = false;
  backendError.clear();

  if (Errors.hasError(validationErrors.value)) {
    return;
  }

  loading.start();
  const { error, model } = await Advances.addPayment(props.advance, payment.value);
  loading.end();

  if (error) {
    backendError.set(error);
    return
  }

  isFirstAttempt.value = true;
  payment.value = {
    amount: null,
    statement: null
  }
  addPaymentPanel.value = null;

  useNuxtApp().$activeModalsBus.$emit('advances:updated');

  emit('saved')
}

function calcRemaining(advance: TAdvance) {
  return Number(advance.amount) - Number(advance.payed);
}
</script>

<style></style>