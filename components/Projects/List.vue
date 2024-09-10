<template>
  <LoadingFromBackend v-if="loading.isLoading.value" />
  <div v-else>
    <v-data-table :headers="headers" :items="projectsList" item-key="id">
      <template v-slot:item.title="{ item }">
    
        <NuxtLink :to="`/projects/${item.id}`">
          <span class="font-weight-black">
            {{ item.title }}
          </span>
        </NuxtLink>
      </template>
      <template v-slot:item.starting_date="{ item }">
        <date-view :date="item.starting_date" />
      </template>
      <template v-slot:item.end_date="{ item }">
        <date-view :date="item.end_date" />
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import type { ProjectsRecord } from "~/app/pocketbase-types";

const headers = [
  { title: 'Title', key: 'title' },
  { title: 'Place', key: 'place' },
  { title: 'Starting Date', key: 'starting_date', align: 'end' },
  { title: 'End Date', key: 'end_date', align: 'end' },
];

const loading = useLoading();
const projects = useProjects();
const backendError = useBackendError();

const projectsList: Ref<ProjectsRecord[]> = ref([]);

async function getAllProjects() {
  loading.start();
  const response = await projects.getAll();
  loading.end();

  if (response.error) {
    backendError.set(response.error)
    return
  }

  projectsList.value = response.models || [];
}

onMounted(() => {
  getAllProjects();
});
</script>

<style></style>