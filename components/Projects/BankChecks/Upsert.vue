<template>
  <v-card :loading="loading.isLoading.value" :disabled="loading.isLoading.value" flat class="ma-0 pa-0">
    <v-card-text>
      <v-row>
        <v-col>
          <text-field :errors="validationErrors.beneficiary_name" v-model="check.beneficiary_name"
            name="Beneficiary Name" placeholder="Beneficiary Name" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <text-field :errors="validationErrors.serial_number" v-model="check.serial_number" name="Serial Number"
            placeholder="Serial Number" />
        </v-col>
        <v-col>
          <text-field :errors="validationErrors.branch" v-model="check.branch" name="Bank/Branch"
            placeholder="Bank/Branch" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <number-field :errors="validationErrors.amount" v-model="check.amount" name="Amount" placeholder="Amount"
            :props="{
              min: 0.01,
              suffix: 'USD'
            }" />
        </v-col>
        <v-col>
          <DatePicker :errors="validationErrors.date" v-model="check.date" name="Date" placeholder="Date" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <text-editor :errors="validationErrors.details" v-model="check.details" name="Details"
            placeholder="Enter detailed description" />
        </v-col>
      </v-row>
    </v-card-text>
    <div v-if="backendError.error && backendError.hasError" class="my-4">
      <v-divider class="my-4"></v-divider>
      <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error" v-if="backendError.hasError" />
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
</template>

<script setup lang="ts">
import type { TBankCheck } from '~/composables/bank_checks';


const props = defineProps({
  check: {
    type: Object,
    required: false,
  },
  project: {
    type: Object,
    required: false,
  }
});

const emit = defineEmits(['cancel', 'saved'])

const check = ref<TBankCheck>({
  beneficiary_name: '',
  serial_number: '',
  amount: null,
  branch: '',
  date: '',
  details: '',
});

function bindBankCheckToProp() {
  if (props.check) {
    check.value = JSON.parse(JSON.stringify(props.check));
  }
}

onMounted(() => {
  bindBankCheckToProp();
});

watch(() => props.check, bindBankCheckToProp, { deep: true })

enum Modes {
  Create = "create",
  Update = "update",
}

const mode = computed<Modes>(() => {
  if (props.check && props.check?.id && props.check.id.length > 0) return Modes.Update;
  return Modes.Create;
});


function cancel() {
  emit('cancel')
}

const backendError = useBackendError();
const Errors = useErrors();

const BankChecks = useBankChecks();

const isFirstAttempt = ref(true);
const validationErrors = computed(() => {
  if (isFirstAttempt.value) return { 'a': [] };
  return BankChecks.validate(check.value)
});

const loading = useLoading();
async function save() {
  isFirstAttempt.value = false;
  backendError.clear();

  if (Errors.hasError(validationErrors.value)) return;

  loading.start();
  const { error, model } = (mode.value == Modes.Update) ? await BankChecks.update(check.value) : await BankChecks.create(check.value, props.project?.id || '');
  loading.end();



  if (error) {
    backendError.set(error);
    return;
  }

  isFirstAttempt.value = true;
  if (mode.value == Modes.Update) {
    bindBankCheckToProp();
    useNuxtApp().$activeModalsBus.$emit('projects:checks:created');

  } else {
    check.value = {
      beneficiary_name: '',
      serial_number: '',
      amount: null,
      branch: '',
      date: '',
      details: '',
    };
    useNuxtApp().$activeModalsBus.$emit('projects:checks:updated');

  }
  emit('saved')
}


</script>