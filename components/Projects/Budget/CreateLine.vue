<template>
  <v-dialog :model-value="show" scrollable persistent max-width="1080px" transition="dialog-transition">
    <v-card rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar>
        <v-toolbar-title class="font-weight-bold">
          Create Budget Line
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="cancel" />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>

          <v-col>
            <text-field :errors="validationErrors.title" v-model="budgetlineData.title" name="Line Title"
              placeholder="Enter Line Title" />
          </v-col>
          <v-col>
            <NumberField :errors="validationErrors.budget" v-model="budgetlineData.budget" name="Amount"
              placeholder="Enter Budget Amount - min is 0.01 USD" :props="{
                min: 0.01,
                suffix: 'USD'
              }" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor :errors="validationErrors.details" v-model="budgetlineData.details" name="Details"
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
  project: { required },
  show: { required, type: Boolean }
})

const emit = defineEmits(['cancel', 'saved']);
function cancel() {
  emit('cancel')
}

const budgetlineData = ref({
  title: null,
  budget: null,
  details: null,

})

const ProjectBudgetlines = useProjectBudgetlines();

const Errors = useErrors();
const isFirstAttempt = ref(true)
const validationErrors = computed<{ [key: string]: any }>(() => {
  if (isFirstAttempt.value) return {};
  return ProjectBudgetlines.validate(budgetlineData.value)
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
  console.log(props.project)
  const response = await ProjectBudgetlines.create(budgetlineData.value, props.project.id);
  loading.end();



  console.log(response)

  if (response.error) {

    backendError.set(response.error)
    return;
  }

  if (response.model) {
    isFirstAttempt.value = true;
    budgetlineData.value = {
      title: null,
      budget: null,
      details: null,
    }
    useNuxtApp().$activeModalsBus.$emit('projects:budgetlines:created')
    emit('saved')
  }
}

</script>