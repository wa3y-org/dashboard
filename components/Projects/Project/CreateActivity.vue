<template>
  <v-dialog :model-value="show" scrollable persistent :overlay="false" max-width="1080px"
    transition="dialog-transition">
    <v-card rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar color="transparent">
        <v-toolbar-title class="font-weight-black">
          <v-icon>mdi-folder-table-outline</v-icon>
          <span class="mx-1"></span>
          Create new activity
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="cancel" />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col>
            <text-field :errors="validationErrors.title" v-model="activity.title" name="Title"
              placeholder="Enter Activity Title" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-field :errors="validationErrors.place" v-model="activity.place" name="place"
              placeholder="Enter Activity Place" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <date-picker v-model="activity.starting_date" name="Starting At" />
          </v-col>
          <v-col>
            <date-picker v-model="activity.end_date" name="Ends At" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor v-model="activity.description" name="Detailed Description"
              placeholder="Write Details Description Here" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor v-model="activity.partners" name="Partners" placeholder="Write Details About Partners" />
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
import type { ProjectsActivitiesRecord, ProjectsActivitiesResponse } from "~/app/pocketbase-types";
const emit = defineEmits(['cancel', 'saved']);

const props = defineProps(['show', 'project'])

function cancel() {
  emit('cancel')
}

const Activities = useActivities();

const activity: Ref<ProjectsActivitiesRecord | ProjectsActivitiesResponse> = ref({
  title: '',
  partners: '',
  project: props.project?.id || '',
  place: '',
  starting_date: '',
  end_date: '',
  description: '',
  
})

watch(() => props.project, () => { activity.value.project = props.project.id }, { deep: true })

const isFirstAttempt = ref(true);
const validationErrors = computed(() => {
  if (isFirstAttempt.value) return {};
  return Activities.validate(activity.value)
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
  const response = await Activities.create(activity.value)
  loading.end();

  if (response.error) {
    backendError.set(response.error)
    return
  }

  activity.value = {
    title: '',
    project: props.project?.id || '',
    place: '',
    starting_date: '',
    end_date: '',
    description: ''
  }

  useNuxtApp().$activeModalsBus.$emit('activities:created')
  emit('saved');


}

</script>

<style></style>