<template>
  <v-dialog :model-value="show" scrollable persistent max-width="1080px" transition="dialog-transition">
    <v-card rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar>
        <v-toolbar-title class="font-weight-bold">
          Update Financial Request
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="cancel" />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col>
            <text-field :errors="validationErrors.title" v-model="finacialRequestData.title" name="Request Title"
              placeholder="Enter Line Title" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor :errors="validationErrors.details" v-model="finacialRequestData.details" name="Details"
              placeholder="Enter detailed description" />
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
        <SaveCancelBtn :loading="loading.isLoading.value" @cancel="cancel" @save="save" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">

const required = true;
const props = defineProps({
  request: { required, type: Object },
  show: { required, type: Boolean }
})

const emit = defineEmits(['cancel', 'saved']);
function cancel() {
  emit('cancel')
}

const finacialRequestData = ref({
  title: null,
  details: null,
})

watch(() => { props.request }, () => {
  finacialRequestData.value = {
    title: props.request.title,
    details: props.request.details,
  }
}, { deep: true })


const Errors = useErrors();
const isFirstAttempt = ref(true)
const validationErrors = computed<{ [key: string]: any }>(() => {
  if (isFirstAttempt.value) return {};
  return {}
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
  const response = await useFinancialRequests().update(Object.assign({id: props.request?.id}, finacialRequestData.value));
  loading.end();



  if (response.error) {

    backendError.set(response.error)
    return;
  }

  if (response.model) {
    isFirstAttempt.value = true;
    finacialRequestData.value = {
      title: null,
      details: null,
    }
    useNuxtApp().$activeModalsBus.$emit('projects:financial_requests:created')
    emit('saved')
  }
}

</script>