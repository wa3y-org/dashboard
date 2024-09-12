<template>
  <projects-project-create-activity :project="project" :show="createActivityModal.isShown.value"
    @cancel="createActivityModal.hide" @saved="handleSave" />
  <v-toolbar color="transparent" class="mt-4">
    <v-toolbar-title>
      <span class="font-weight-black">
        {{ project?.title }}
      </span>
      - Activities
    </v-toolbar-title>
    <v-spacer>
    </v-spacer>
    <v-btn color="primary" class="ma-4" variant="tonal" rounded='pill' @click="createActivityModal.show">
      <v-icon>mdi-plus-thick</v-icon>
      <span class="mx-1"></span>
      <span class="font-weight-black">
        Create New Activity
      </span>
    </v-btn>
  </v-toolbar>
  <v-data-table :headers="headers" :items="activitiesList" :loading="loading.isLoading.value">
    <template v-slot:item.title="{ item }">
      <nuxt-link :to="`/activities/${item.id}`">
        <span class="font-weight-black text-capitalize">{{ item.title }}</span>
      </nuxt-link>
    </template>
    <template v-slot:item.starting_date="{ item }">
      <div class="font-weight-bold ">
        <date-view :date="item.starting_date" v-if="item.starting_date" />
        <span v-else class="text-grey">N/A</span>
      </div>
    </template>
    <template v-slot:item.end_date="{ item }">
      <div class="font-weight-bold ">
        <date-view :date="item.end_date" v-if="item.end_date" />
        <span v-else class="text-grey">N/A</span>
      </div>
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import type { ProjectsActivitiesRecord, ProjectsActivitiesResponse } from "~/app/pocketbase-types";
const props = defineProps(['project'])

const createActivityModal = useModal();

function handleSave() {
  createActivityModal.hide()
}

const activitiesList: Ref<(ProjectsActivitiesRecord | ProjectsActivitiesResponse)[]> = ref([])

const loading = useLoading();
async function loadActivities() {
  loading.start();
  const response = await useActivities().getAll();
  loading.end();

  if (response.models) {
    activitiesList.value = response.models;
  }
}

onMounted(() => {
  loadActivities();
  useNuxtApp().$activeModalsBus.$on('activities:created', loadActivities)
});

const headers = [
  { title: 'Title', key: 'title' },
  { title: 'Place', key: 'place' },
  { title: 'Starting Date', key: 'starting_date', align: 'end' },
  { title: 'End Date', key: 'end_date', align: 'end' },
]

</script>

<style></style>