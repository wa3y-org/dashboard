<template>
  <v-card class="my-4" rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
    <v-toolbar color="transparent">
      <v-tabs v-model="tab">
        <v-tab value="project" class="font-weight-black">
          <v-icon class="mx-2" size="24">mdi-folder-open-outline</v-icon>
          Project
        </v-tab>
        <v-tab value="staff" class="font-weight-black">
          <v-icon class="mx-2" size="24">mdi-account-group</v-icon>
          Staff
        </v-tab>
        <v-tab value="finance" class="font-weight-black">
          <v-icon class="mx-2" size="24">mdi-finance</v-icon>
          Finance
        </v-tab>
        <v-tab value="activities" class="font-weight-black">
          <v-icon class="mx-2" size="24">mdi-folder-table-outline</v-icon>
          Activities
        </v-tab>
        <v-tab value="settings" class="font-weight-black">
          <v-icon class="mx-2" size="24">mdi-folder-settings-outline</v-icon>
          Settings
        </v-tab>
      </v-tabs>

      <v-spacer></v-spacer>
      <v-btn color="info" class="rounded-lg mx-4" variant="elevated" :to="`/projects/${projectId}/update`">
        <v-icon>mdi-pencil</v-icon>
        <span class="mx-2"></span>
        Update
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="project" transition="fade-transition">
          <ProjectsProjectViewData :project="project" />
        </v-tabs-window-item>
        <v-tabs-window-item value="activities" transition="fade-transition">
          <ProjectsProjectActivities :project="project" />
        </v-tabs-window-item>
        <v-tabs-window-item value="staff" transition="fade-transition">
          <projects-staff :project="project" /> 
        </v-tabs-window-item>
        <v-tabs-window-item value="finance" transition="fade-transition">
          <ProjectsFinance :project="project" />
        </v-tabs-window-item>
        <v-tabs-window-item value="settings" transition="fade-transition">
          <ProjectsProjectSettings :project="project" />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import type { ProjectsRecord } from "~/app/pocketbase-types";

const projectId = useRoute().params.id;
const tab = ref('project');

const project: Ref<ProjectsRecord> = ref({
  title: '',
  place: '',
  starting_date: null,
  end_date: null,
  details: '',
})

const loading = useLoading();
const backendError = useBackendError();
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
</script>

<style></style>