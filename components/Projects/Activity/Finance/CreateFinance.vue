<template>
  <v-dialog :model-value="show" scrollable persistent max-width="1080px" transition="dialog-transition">
    <v-card rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar :color="toolbarColor">
        <v-toolbar-title class="font-weight-bold">
          Add {{ type }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="cancel" />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col>
            <text-field name="type" :props="{
              value: type,
              readonly: true,
              reverse: true,

            }" :errors="validationErrors.type" />
          </v-col>
        </v-row>
        <v-row>

          <v-col>
            <text-field :errors="validationErrors.fund_facility" v-model="financeData.fund_facility"
              :name="facilityNickName" placeholder="Enter Facility Name" />
          </v-col>
          <v-col>
            <NumberField :errors="validationErrors.amount" v-model="financeData.amount" name="Amount"
              placeholder="Enter amount - min is 0.01 USD" :props="{
                min: 0.01,
                suffix: 'USD'
              }" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor :errors="validationErrors.statement" v-model="financeData.statement" name="Statement"
              placeholder="Enter detailed statement" />
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
        <SaveCancelBtn :loading="loading.isLoading.value" @cancel="cancel" @save="save" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const required = true;

const props = defineProps({
  activity: { required },
  type: {
    required,
    type: String,
    validator(value: string) {
      const validTypes = ['donation', 'expense']

      return validTypes.includes(value);
    },
  },
  show: { required, type: Boolean }
})

const emit = defineEmits(['cancel', 'saved']);

const toolbarColor = computed(() => {
  switch (props.type) {
    case 'donation':
      return 'green-lighten-4'
      break;
    case 'expense':
      return 'red-lighten-4'
    default:
      return 'black'
  }
});

const facilityNickName = computed(() => {
  switch (props.type) {
    case 'donation':
      return 'Donor'
      break;
    case 'expense':
      return 'Beneficial'
    default:
      return 'Facility'
  }
});

function cancel() {
  emit('cancel')
}


const financeData = ref({
  fund_facility: '',
  amount: null,
  statement: '',
  type: props.type
})

const ActivityFinance = useActivityFinance();

const Errors = useErrors();
const isFirstAttempt = ref(true)
const validationErrors = computed<{ [key: string]: any }>(() => {
  if (isFirstAttempt.value) return {};
  return ActivityFinance.validate(props.activity, financeData.value)
});

const loading = useLoading();
const backendError = useBackendError();
async function save() {
  isFirstAttempt.value = false;
  backendError.clear();
  if (Errors.hasError(validationErrors.value)) {
    return;
  }
  loading.start();
  const response = await ActivityFinance.create(props.activity, financeData.value);
  loading.end();



  console.log(response)

  if (response.error) {

    backendError.set(response.error)
    return;
  }

  if (response.model) {
    isFirstAttempt.value = true;
    financeData.value = {
      fund_facility: '',
      amount: null,
      statement: '',
      type: props.type
    }
    useNuxtApp().$activeModalsBus.$emit('activities:finance:created')
    emit('saved')
  }
}
</script>

<style></style>