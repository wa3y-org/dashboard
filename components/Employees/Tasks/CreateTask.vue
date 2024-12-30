<template>
  <div class="ma-2 rounded-xl border elevation-4 overflow-hidden">

    <v-expansion-panels :multiple="false" v-model="createTaskPanel" :loading="loading.isLoading.value">
      <v-expansion-panel value="createTaskMainPanel" :loading="loading.isLoading.value"
        :disabled="loading.isLoading.value">
        <v-expansion-panel-title class="text-primary font-weight-bold">
          <v-icon>mdi-plus-box</v-icon>
          <span class="mx-2"></span>
          Create New Task
        </v-expansion-panel-title>
        <v-divider></v-divider>
        <v-expansion-panel-text>
          <div class="py-4">
            <text-field v-model="task.title" :errors="validationErrors.title" name="Subject"
              placeholder="Enter Task subject or title" />
            <p class="my-4"></p>
            <text-editor v-model="task.details" :errors="validationErrors.details" name="Details"
              placeholder="Enter Task details" />
          </div>
          <v-row>
            <v-col>
              <DatePicker name="Due Date" v-model="task.due_date" />
            </v-col>
            <v-col>
              <DatePicker name="Complition Date"  v-model="task.complition_date"/>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
        <div v-if="backendError.error && backendError.hasError" class="my-4">
          <v-divider class="my-4"></v-divider>
          <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error"
            v-if="backendError.hasError" />
        </div>
        <v-divider></v-divider>
        <v-expansion-panel-text class="pa-0 ma-0">
          <v-card-actions>
            <v-alert type="error" :value="true" variant="text" v-if="Errors.hasError(validationErrors)">
              Input Validation Error
            </v-alert>
            <v-spacer></v-spacer>
            <SaveCancelBtn :loading="loading.isLoading.value" @cancel="hideCreateTaskMainPanel" @save="save" />
          </v-card-actions>
        </v-expansion-panel-text>
      </v-expansion-panel>

    </v-expansion-panels>
  </div>
</template>

<script lang="ts" setup>


const props = defineProps(['employee'])
const emit = defineEmits(['saved'])

const createTaskPanel = ref(null)

const task = ref({
  employee: props?.employee?.id,
  details: '',
  title: '',
  due_date: null,
  complition_date: null,
});

function hideCreateTaskMainPanel() {
  createTaskPanel.value = null
}

const EmployeesTasks = useEmployeesTasks();

const isFirstAttempt = ref(true);
const validationErrors = computed(() => {
  if (isFirstAttempt.value) return {};
  return EmployeesTasks.validate(task.value);
});

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
  const response = await EmployeesTasks.create(task.value, props?.employee?.id);
  loading.end();

  if (response.error) {
    backendError.set(response.error);
    return;
  }

  if (response.model) {
    task.value = {
      employee: props?.employee?.id,
      details: '',
      title: '',
      due_date: null,
      complition_date: null,
    };
    isFirstAttempt.value = true;
    hideCreateTaskMainPanel();
    useNuxtApp().$activeModalsBus.$emit('employees:tasks:created')
  }
}
</script>

<style></style>