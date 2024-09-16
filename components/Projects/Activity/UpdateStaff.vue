<template>
  <v-dialog :model-value="show" scrollable persistent max-width="1280px" transition="dialog-transition">
    <v-card rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar color="transparent">
        <v-toolbar-title>
          <v-icon>mdi-account-multiple-plus-outline</v-icon>
          <span class="mx-2 font-weight-black">
            Update Activity Staff Member Data
          </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="cancel" color="error" icon="mdi-close" class="mx-2" />
      </v-toolbar>
      <v-divider></v-divider>
      <ProjectsSetStaffData :staff="staff" :is-first-attempt="isFirstAttempt" />
      <div v-if="backendError.error && backendError.hasError" class="my-4">
        <v-divider class="my-4"></v-divider>
        <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error" v-if="backendError.hasError" />
      </div>
      <v-divider></v-divider>
      <v-card-actions class="pa-4">
        <v-alert type="error" :value="true" variant="text" v-if="hasValidationErrors">
          Input Validation Error
        </v-alert>
        <v-spacer></v-spacer>
        <SaveCancelBtn @cancel="cancel" @save="save" :loading="loading.isLoading.value" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { type StaffPerson, type TStaff } from "~/composables/staff/index";

const props = defineProps(['staff', 'show'])
const emit = defineEmits(['cancel', 'saved']);

function cancel() {
  emit('cancel')
}


const Staff = useStaff();

const isFirstAttempt = ref(true);

const loading = useLoading();
const validationErrorsWrapper = useErrors();
const backendError = useBackendError();

const hasValidationErrors = computed(() => {
  if (isFirstAttempt.value) return false;
  return validationErrorsWrapper.hasError(Staff.validate(props.staff))
});
async function save() {
  isFirstAttempt.value = false;
  backendError.clear();
  console.log('staff to validate', props.staff)
  if (hasValidationErrors.value) {
    return
  }

  loading.start();
  const response = await Staff.updateActivityStaff(props.staff);
  loading.end();

  if (response.error) {
    backendError.set(response.error)
    return
  }


  useNuxtApp().$activeModalsBus.$emit('activity:staff:updated');
  isFirstAttempt.value = true;
  emit('saved');

}

</script>

<style></style>