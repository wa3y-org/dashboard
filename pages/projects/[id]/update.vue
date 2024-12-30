<template>
  <v-card class="my-4" rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
    <v-toolbar color="transparent">
      <v-toolbar-title class="font-weight-bold">
        <v-icon class="mx-2">mdi-folder-edit</v-icon>
        Update Project Details
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-8">
      <ProjectsCreateData v-model="project" :validation-errors="validationErrors" />
    </v-card-text>
    <div v-if="backendError.error && backendError.hasError" class="my-4">
      <v-divider class="my-4"></v-divider>
      <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error" v-if="backendError.hasError" />
    </div>

    <v-divider></v-divider>
    <v-card-actions class="pa-4">
      <v-alert type="error" :value="true" variant="text" v-if="errors.hasError(validationErrors)">
        Input Validation Error
      </v-alert>


      <v-spacer></v-spacer>
      <saveCancelBtn :loading="loading.isLoading.value" @cancel="cancel" @save="save" />
    </v-card-actions>
  </v-card>
  <editor />
</template>

<script lang="ts" setup>
import type { ProjectsRecord } from "~/app/pocketbase-types";

const projectId = useRoute().params.id;

const project: Ref<ProjectsRecord> = ref({
  title: '',
  place: '',
  objectives: '',
  targeted_groups: '',
  context_dependant_topics: '',
  starting_date: null,
  end_date: null,
  details: '',
})


async function loadProject() {
  loading.start();
  const response = await useProjects().getOne(projectId.toString())
  loading.end();

  if (response.error) {
    backendError.set(response.error)
    return;
  }

  if (response.model) {
    project.value = response.model;
  }
}

onMounted(() => {
  loadProject();
});

const projects = useProjects();
const isFirstAttempt = ref(true);

const errors = useErrors();
const backendError = useBackendError();
const validationErrors = computed(() => {
  if (isFirstAttempt.value) {
    return {}
  }
  return projects.validateProject(project.value)
});
const loading = useLoading();

async function save() {
  backendError.clear();
  isFirstAttempt.value = false;

  if (errors.hasError(validationErrors.value)) {
    return;
  }

  loading.start();
  const response = await projects.update(project.value)
  loading.end();
  if (response.error) {
    backendError.set(response.error)
    return
  }

  useRouter().push(`/projects/${response.model?.id}`)
}

function cancel() {
  useRouter().push('/projects')
}
</script>

<style></style>