<template>
  <w-html-view-dialog :title="budgetlineDetailsTitle" :show="budgetlineDetailsModal.isShown.value"
    :html="budgetlineDetailsToShow" @close="budgetlineDetailsModal.hide" />
  <ProjectsBudgetCreateLine @cancel="addLineModal.hide" @saved="addLineModal.hide" :show="addLineModal.isShown.value"
    :project="project" />
  <ProjectsBudgetUpdateLine @cancel="cancelUpdate" @saved="handleUpdate" :show="updateBudgetlineModal.isShown.value"
    :line="budgetlineToUpdate" />
  <v-card flat>
    <v-toolbar color="transparent">
      <v-toolbar-title class="font-weight-bold">
        Budget Lines
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" variant="tonal" class="mx-2" rounded="pill" @click="addLineModal.show">
        <v-icon>mdi-plus-thick</v-icon>
        <span class="mx-2">
          Add Line
        </span>
      </v-btn>
    </v-toolbar>
    <div>
      <v-divider></v-divider>

      <div class="font-weight-black text-h6 my-4 border-lg rounded-lg">
        <v-card-actions>
          Total :
          <w-usd :amount="totalAmount" />
          <v-spacer></v-spacer>

          Used :
          <w-usd color="black" :amount="totalUsed" />
          <v-spacer></v-spacer>

          Remaining :
          <w-usd :color="totalRemaining < 100 ? 'warning' : 'primary'" :amount="totalRemaining" />
          <v-icon v-if="totalRemaining < 100" color="warning">mdi-sign-caution</v-icon>

        </v-card-actions>
      </div>
      <v-divider></v-divider>
      <v-data-table :loading="loading.isLoading.value" :headers="headers" :items="budgetlinesList" item-key="id">
        <template v-slot:item.title="{ item }">
          <span class="font-weight-black text-capitalize">
            {{ item.title }}
          </span>
        </template>
        <template v-slot:item.budget="{ item }">
          <w-usd class="font-weight-black text-capitalize" :amount="item.budget" />
        </template>
        <template v-slot:item.used_amount="{ item }">
          <w-usd class="font-weight-black text-capitalize" color="black" :amount="item.used_amount" />
        </template>
        <template v-slot:item.remaining="{ item }">
          <w-usd class="font-weight-black text-capitalize" :amount="item.budget - item.used_amount"
            :color="item.budget - item.used_amount < 100 ? 'warning' : 'primary'" />
          <v-icon v-if="item.budget - item.used_amount < 100" color="warning">mdi-sign-caution</v-icon>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="my-2">
            <v-btn color="primary" variant="text" icon="mdi-file-document-outline"
              @click="showBudgetlineDetails(item)"></v-btn>

            <v-btn class="mx-2" color="info" variant="tonal" icon="mdi-pencil" rounded="lg"
              @click="setBudgetlineToUpdate(item)"></v-btn>

            <v-btn color="error" variant="text" icon="mdi-delete" @click="confirmRemove(item)"></v-btn>
          </div>
        </template>
      </v-data-table>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import type { TProjectBudgetLine } from '~/composables/lines';


const props = defineProps(['project'])
const addLineModal = useModal();

const headers = [
  { title: 'Title', key: 'title' },
  { title: 'Budget', key: 'budget' },
  { title: 'Used Amount', key: 'used_amount' },
  { title: 'Remaining', key: 'remaining' },
  { title: 'Actions', key: 'actions', align: 'end' },
]

const budgetlinesList = ref<TProjectBudgetLine[]>([])

const loading = useLoading();
async function loadBudgetlines() {
  loading.start();
  const response = await useProjectBudgetlines().get.all(props.project.id)
  loading.end();

  console.log(response)
  if (response.models) {
    budgetlinesList.value = response.models;
  }
}

onMounted(() => {
  loadBudgetlines();
  useNuxtApp().$activeModalsBus.$on('projects:budgetlines:created', loadBudgetlines)
  useNuxtApp().$activeModalsBus.$on('projects:budgetlines:updated', loadBudgetlines)
  useNuxtApp().$activeModalsBus.$on('projects:budgetlines:removed', loadBudgetlines)

})
const totalAmount = computed(() => {
  let amount = 0;
  for (let line of budgetlinesList.value) {
    amount += line.budget;
  }

  return amount;
});

const totalUsed = computed(() => {
  let amount = 0;
  for (let line of budgetlinesList.value) {
    amount += line.used_amount;
  }

  return amount;
});

const totalRemaining = computed(() => {
  return totalAmount.value - totalUsed.value;
});


const budgetlineDetailsModal = useModal();
const budgetlineDetailsToShow = ref<string>('');
const budgetlineDetailsTitle = ref<string>('');

function showBudgetlineDetails(line: TProjectBudgetLine) {
  budgetlineDetailsToShow.value = line.details || '';
  budgetlineDetailsTitle.value = `
    Line : ( ${line.title} )
  `;
  budgetlineDetailsModal.show();
}

const Remove = useConfirmRemove();
async function confirmRemove(line: TProjectBudgetLine) {
  const { isConfirmed } = await Remove.confirm();
  if (isConfirmed) {
    await Remove.doRemove(async () => {
      await useProjectBudgetlines().remove(line)
      useNuxtApp().$activeModalsBus.$emit('projects:budgetlines:removed');

    });
  }
}

const updateBudgetlineModal = useModal();
const budgetlineToUpdate = ref<TProjectBudgetLine | null>(null);

function setBudgetlineToUpdate(Budgetline: TProjectBudgetLine) {
  budgetlineToUpdate.value = Object.assign({}, Budgetline);
  updateBudgetlineModal.show();
}

function cancelUpdate() {
  updateBudgetlineModal.hide();
  // staffToUpdate.value = null;
}

function handleUpdate() {
  updateBudgetlineModal.hide();
}

</script>