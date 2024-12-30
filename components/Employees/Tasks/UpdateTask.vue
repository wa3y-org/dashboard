<template>
  <v-dialog :model-value="show" scrollable persistent :overlay="false" max-width="1080px"
    transition="dialog-transition">
    <v-card rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar color="transparent">
        <v-toolbar-title>
          <v-icon>mdi-invoice-plus-outline</v-icon>
          <span class="mx-2 font-weight-bold">
            Update Task
          </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="cancel" class="mx-2" />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text class="my-4">
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
            <DatePicker name="Complition Date" v-model="task.complition_date" />
          </v-col>
        </v-row>

      </v-card-text>
      <div v-if="backendError.error && backendError.hasError" class="my-4">
        <v-divider class="my-4"></v-divider>
        <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error"
          v-if="backendError.hasError" />
      </div>
      <v-divider></v-divider>
      <v-card-actions>
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


const props = defineProps(['task', 'show'])
const emit = defineEmits(['saved', 'cancel'])

function cancel() {
  emit('cancel')
}

const EmployeesTasks = useEmployeesTasks();

const isFirstAttempt = ref(true);
const validationErrors = computed(() => {
  if (isFirstAttempt.value) return {};
  return EmployeesTasks.validate(props.task);
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
  const response = await EmployeesTasks.update(props.task, props.task.id);
  loading.end();

  if (response.error) {
    backendError.set(response.error);
    return;
  }

  if (response.model) {
    isFirstAttempt.value = true;
    useNuxtApp().$activeModalsBus.$emit('employees:tasks:updated')
    emit('saved')
  }
}
</script>

<style></style>