<template>
  <v-dialog :model-value="show" scrollable persistent :overlay="false" max-width="1080px"
    transition="dialog-transition">
    <v-card rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar color="transparent">
        <v-toolbar-title>
          <v-icon>mdi-invoice-plus-outline</v-icon>
          <span class="mx-2 font-weight-bold">
            Add Advance
          </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="cancel" class="mx-2" />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text class="my-4">
        <v-row>
          <v-col>
            <w-select-employee placeholder="Select Employee from here" :errors="validationErrors.employee" v-model="advance.employee" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <number-field placeholder="Enter Advance Amount" :errors="validationErrors.amount" v-model="advance.amount" name="Amount" :props="{
              min: 1,
              suffix: 'USD'
            }" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <text-editor :errors="validationErrors.statement" v-model="advance.statement" name="Details" />
          </v-col>
        </v-row>
      </v-card-text>
      <div v-if="backendError.error && backendError.hasError" class="my-4">
        <v-divider class="my-4"></v-divider>
        <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error"
          v-if="backendError.hasError" />
      </div>
      <v-divider></v-divider>
      <v-card-actions class="pa-4">
        <v-alert type="error" :value="true" variant="text" v-if="Errors.hasError(validationErrors)">
          Input Validation Error
        </v-alert>
        <v-spacer></v-spacer>
        <save-cancel-btn :loading="loading.isLoading.value" @cancel="cancel" @save="save" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const props = defineProps(['show'])
const emit = defineEmits(['cancel', 'saved'])

function cancel() {
  emit('cancel')
}

const loading = useLoading();

const backendError = useBackendError();
const Errors = useErrors();

const advance = ref({
  employee: null,
  amount: null,
  statement: null
})

const Advances = useEmployeesAdvances();

const isFirstAttempt = ref(true);
const validationErrors = computed(() => {
  if (isFirstAttempt.value) return { 'a': [] };
  return Advances.validate(advance.value)
});

async function save() {
  isFirstAttempt.value = false;
  backendError.clear();

  if (Errors.hasError(validationErrors.value)) return;


  loading.start();
  const { error } = await Advances.create(advance.value.employee, {
    amount: advance.value.amount,
    statement: advance.value.statement
  });
  loading.end();

  if (error) {
    backendError.set(error);
    return;
  }

  isFirstAttempt.value = true;
  advance.value = {
    employee: null,
    amount: null,
    statement: null
  }
  useNuxtApp().$activeModalsBus.$emit('advances:created');
  emit('saved')
}

</script>

<style></style>