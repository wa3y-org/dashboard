<template>
  <v-dialog :model-value="show" scrollable persistent :overlay="false" max-width="1080px"
    transition="dialog-transition">
    <v-card rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar color="transparent">
        <v-toolbar-title>
          <v-icon>mdi-invoice-plus-outline</v-icon>
          <span class="mx-2 font-weight-bold">
            Update Advance
          </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="cancel" class="mx-2" />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text class="my-4">
        <v-row>
          <v-col>
            <w-select-employee :errors="validationErrors.employee" v-model="advanceObj.employee" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <number-field :errors="validationErrors.amount" v-model="advanceObj.amount" name="Amount" :props="{
              min: 1,
            }" />
          </v-col>
          <v-col>
            <number-field placeholder="Per Month" :errors="validationErrors.deduction" v-model="advanceObj.deduction"
              name="Deduction" :props="{
                min: 1,
                max: advanceObj.amount || 1,
                suffix: 'USD/mo'
              }" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <text-editor :errors="validationErrors.statement" v-model="advanceObj.statement" name="Details" />
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
const props = defineProps(['show', 'advance'])
const emit = defineEmits(['cancel', 'saved'])

function cancel() {
  emit('cancel')
}

const loading = useLoading();

const backendError = useBackendError();
const Errors = useErrors();

const Advances = useEmployeesAdvances();

const isFirstAttempt = ref(true);
const validationErrors = computed(() => {
  if (isFirstAttempt.value) return { 'a': [] };
  return Advances.validate(props.advance)
});

const advanceObj = ref({
  employee: null,
  amount: null,
  deduction: null,
  statement: null
})

onMounted(() => {
  advanceObj.value = {
    employee: props.advance?.expand?.employee,
    amount: props.advance?.amount,
    deduction: props.advance?.deduction,
    statement: props.advance?.statement
  }
});

watch(() => props.show, () => {
  if (props.show) {
    advanceObj.value = {
      employee: props.advance?.expand?.employee,
      amount: props.advance?.amount,
      deduction: props.advance?.deduction,
      statement: props.advance?.statement
    }
  }
}, { deep: true })

async function save() {
  isFirstAttempt.value = false;
  backendError.clear();

  // if (Errors.hasError(validationErrors.value)) return;


  loading.start();
  const { error } = await Advances.update({
    id: props.advance?.id,
    employee: advanceObj.value.employee?.id || '',
    amount: advanceObj.value.amount,
    deduction: advanceObj.value.deduction,
    statement: advanceObj.value.statement
  });
  loading.end();

  if (error) {
    backendError.set(error);
    return;
  }

  isFirstAttempt.value = true;

  useNuxtApp().$activeModalsBus.$emit('advances:updated');
  emit('saved')
}

</script>

<style></style>