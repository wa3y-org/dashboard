<template>
  <v-dialog :model-value="show" scrollable persistent max-width="1280px" transition="dialog-transition">
    <v-card rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar color="transparent">
        <v-toolbar-title>
          <v-icon>mdi-account-multiple-plus-outline</v-icon>
          <span class="mx-2 font-weight-black">
            Add To Activity Staff
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
const props = defineProps(['activity', 'show'])
const emit = defineEmits(['cancel', 'saved']);

function cancel() {
  emit('cancel')
}

const staff = ref<{
  position: string,
  description: string,
  type: 'member' | 'employee' | null,
  person: any
}>({
  position: '',
  description: '',
  type: null,
  person: null
})


const Staff = useStaff();

const isFirstAttempt = ref(true);

const loading = useLoading();
const validationErrorsWrapper = useErrors();
const backendError = useBackendError();

const hasValidationErrors = computed(() => {
  if (isFirstAttempt.value) return false;
  return validationErrorsWrapper.hasError(Staff.validate(staff.value))
});

async function save() {
  isFirstAttempt.value = false;
  backendError.clear();
  if (hasValidationErrors.value) {
    return
  }

  loading.start();
  const response = await Staff.addActivityStaff(props.activity, staff.value);
  loading.end();

  if (response.error) {
    backendError.set(response.error)
    return
  }

  staff.value = {
    position: '',
    description: '',
    type: null,
    person: null
  }
  useNuxtApp().$activeModalsBus.$emit('activity:staff:created');
  isFirstAttempt.value = true;
  emit('saved');

}

</script>

<style></style>