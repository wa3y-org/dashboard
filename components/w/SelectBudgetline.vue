<template>
  <v-autocomplete :loading="loading.isLoading.value" :error-messages="errors" :multiple="false" v-model="model"
    item-value="id" chips v-bind="props.props" return-object hide-selected clearable open-on-clear hide-details="auto"
    rounded="lg" variant="outlined" :items="budgetlinesList" class="font-weight-bold" :placeholder="placeholder"
    :custom-filter="filterByTitle">
    <template v-slot:prepend-inner>
      <div class="mx-2 text-primary text-no-wrap">
        <v-icon v-if="icon">{{ icon }}</v-icon>
        Select Line :
      </div>
    </template>
    <template v-slot:chip="{ props, item }">
      <v-chip v-if="model" size="large" v-bind="props" class="font-weight-bold bg-white pa-0">

        <span class="mx-3 px-3">
          {{ item.raw.title }}
        </span>

        <v-chip color="transparent">
          <div class="text-black">
              Remaining :
              <w-usd :amount="item.raw.budget - item.raw.used_amount" />
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
          </div>
          <v-spacer></v-spacer>
          <v-chip>
            <p>
              Remaining :
              <w-usd :amount="item.raw.budget - item.raw.used_amount" />
            </p>
          </v-chip>

        </div>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script lang="ts" setup>
import type { TProjectBudgetLine } from "~/composables/lines";


const model = defineModel()
const props = defineProps(['project', 'errors', 'placeholder', 'name', 'icon', 'props', 'items', 'hidden'])


const ProjectsBudgetLines = useProjectBudgetlines();
const budgetlinesList = ref<TProjectBudgetLine[]>([]);

const loading = useLoading();

async function loadBudgetLines() {
  budgetlinesList.value = [];
  loading.start();
  const { error, models } = await ProjectsBudgetLines.get.all(props.project);
  if (error) {
    return;
  }

  if (models) {
    budgetlinesList.value = models;
  }

  loading.end();
}

onMounted(async () => {
  await loadBudgetLines();
  setAssignedBudgetline();
})

function setAssignedBudgetline() {
  if (!model.value) return;
  for (let line of budgetlinesList.value) {
    if (line.id == model.value) {
      model.value = line;
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