<template>
  <v-autocomplete :loading="loading.isLoading.value" :error-messages="errors" :multiple="false" v-model="model"
    item-value="id" chips v-bind="props.props" return-object hide-selected clearable open-on-clear hide-details="auto"
    rounded="lg" variant="outlined" :items="projectsList" class="font-weight-bold" :placeholder="placeholder"
    :custom-filter="filterByTitle">
    <template v-slot:prepend-inner>
      <div class="mx-2 text-primary text-no-wrap">
        <v-icon v-if="icon">{{ icon }}</v-icon>
        Select Project :
      </div>
    </template>
    <template v-slot:chip="{ props, item }">
      <v-chip v-if="model" size="large" v-bind="props" class="font-weight-bold bg-white pa-0">

        <span class="mx-3 px-3">
          {{ item.raw.title }}
        </span>

        <v-chip color="transparent">
          <div class="text-black">
            {{ item.raw.place }}
            <span class="mx-2" </span>

              <date-view :date="item.raw.starting_date" />
              <span class="mx-2">
                <->
              </span>
              <date-view :date="item.raw.end_date" />
          </div>
        </v-chip>
        <span class="mx-2" </span>
      </v-chip>
    </template>
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" title="" :disabled="false">
        <div class="d-flex align-center">
          <div class="d-inline-block mx-4">
            <span class="font-weight-bold text-nowrap">{{ item.raw.title }}</span>
            <p class="text-grey-darken-2"> {{ item.raw.place }}</p>

          </div>
          <v-spacer></v-spacer>
          <v-chip>
            <date-view :date="item.raw.starting_date" />
            <span class="mx-2">
              <==>
            </span>
            <date-view :date="item.raw.end_date" />
          </v-chip>

        </div>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script lang="ts" setup>
import type { TProject } from "@/composables/projects/index";


const model = defineModel()
const props = defineProps(['errors', 'placeholder', 'name', 'icon', 'props', 'items', 'hidden'])




const Projects = useProjects();
const projectsList = ref<TProject[]>([]);

const loading = useLoading();

async function loadProjects() {
  projectsList.value = [];
  loading.start();
  const { error, models } = await Projects.getAll();
  if (error) {
    return;
  }

  if (models) {
    projectsList.value = models;
  }

  loading.end();
}
onMounted(async () => {
  await loadProjects();
  setAssignedProject();
})

function setAssignedProject() {
  if (!model.value) return;
  for (let project of projectsList.value) {
    if (project.id == model.value) {
      model.value = project;
    }
  }
}


function filterByTitle(itemTitle: string, queryText: string, item: any) {
  const textOne = item.raw.title.toLowerCase()

  const searchText = queryText.toLowerCase()
  return textOne.indexOf(searchText) > -1
}
</script>

<style></style>