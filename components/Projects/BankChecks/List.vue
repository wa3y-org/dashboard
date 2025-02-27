<template>
  <w-html-view-dialog :title="bankCheckDetailsTitle" :show="bankCheckDetailsModal.isShown.value"
    :html="bankCheckDetailsToShow" @close="bankCheckDetailsModal.hide" />
  <v-dialog :model-value="createCheckModal.isShown" scrollable persistent :overlay="false" max-width="900px"
    transition="dialog-transition">
    <v-card rounded="xl">
      <v-toolbar>
        <v-toolbar-title>
          Create Check
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="createCheckModal.hide()"></v-btn>
      </v-toolbar>

      <ProjectsBankChecksUpsert @cancel="createCheckModal.hide" @saved="createCheckModal.hide" :project="project" />
    </v-card>
  </v-dialog>
  <v-dialog :model-value="updateBankCheckModal.isShown" scrollable persistent :overlay="false" max-width="900px"
    transition="dialog-transition">
    <v-card rounded="xl">
      <v-toolbar>
        <v-toolbar-title>
          Update Check ({{ bankCheckToUpdate?.serial_number }})
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="updateBankCheckModal.hide()"></v-btn>
      </v-toolbar>

      <ProjectsBankChecksUpsert :check="bankCheckToUpdate" @cancel="cancelUpdate" @saved="handleUpdate"
        :project="project" />
    </v-card>
  </v-dialog>
  <v-row>
    <v-col>
      <div class="d-flex align-center">
        <h3 class="text-h5 font-weight-bold">Bank Checks</h3>
        <v-spacer></v-spacer>
        <div>
          <v-btn @click="createCheckModal.show()" rounded="pill" variant="tonal" prepend-icon="mdi-plus"
            color="primary">Add Check</v-btn>
        </div>
      </div>
    </v-col>
  </v-row>
  <v-divider class="mb-2 mt-4"></v-divider>
  <v-row>
    <v-data-table :headers="headers" :items="checksList" :loading="loading.isLoading.value">
      <template v-slot:item.amount="{ item }">
        <w-usd class="font-weight-black text-capitalize" :amount="item.amount" />
      </template>
      <template v-slot:item.date="{ item }">
        <DateView :date="item.date" />
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="my-2">
          <v-btn color="primary" variant="text" icon="mdi-file-document-outline"
            @click="showBankCheckDetails(item)"></v-btn>

          <v-btn class="mx-2" color="info" variant="tonal" icon="mdi-pencil" rounded="lg"
            @click="setBankCheckToUpdate(item)"></v-btn>

          <v-btn color="error" variant="text" icon="mdi-delete" @click="confirmRemove(item)"></v-btn>
        </div>
      </template>
    </v-data-table>
  </v-row>
</template>

<script setup lang="ts">
import { type TBankCheck } from '~/composables/bank_checks/index';


const props = defineProps({
  project: { required: true, type: Object },
})

const createCheckModal = useModal();

const checksList = ref<TBankCheck[]>([]);

const headers = [
  { title: 'Serial', key: 'serial_number' },
  { title: 'Name', key: 'beneficiary_name' },
  { title: 'Branch', key: 'branch' },
  { title: 'Amount', key: 'amount' },
  { title: 'Date', key: 'date' },
  { title: 'Actions', key: 'actions', align: 'end' },
]


const loading = useLoading();
async function loadBankChecks() {
  loading.start();
  const response = await useBankChecks().get.all(props.project.id)
  loading.end();

  if (response.models) {
    checksList.value = response.models;
  }
}

onMounted(() => {
  loadBankChecks();
  useNuxtApp().$activeModalsBus.$on('projects:checks:created', loadBankChecks)
  useNuxtApp().$activeModalsBus.$on('projects:checks:updated', loadBankChecks)
  useNuxtApp().$activeModalsBus.$on('projects:checks:removed', loadBankChecks)

})


const bankCheckDetailsModal = useModal();
const bankCheckDetailsToShow = ref<string>('');
const bankCheckDetailsTitle = ref<string>('');

function showBankCheckDetails(check: TBankCheck) {
  bankCheckDetailsToShow.value = check.details || '';
  bankCheckDetailsTitle.value = `
    Check : ( ${check.serial_number} )
  `;
  bankCheckDetailsModal.show();
}

const Remove = useConfirmRemove();
async function confirmRemove(check: TBankCheck) {
  const { isConfirmed } = await Remove.confirm();
  if (isConfirmed) {
    await Remove.doRemove(async () => {
      await useBankChecks().remove(check)
      useNuxtApp().$activeModalsBus.$emit('projects:checks:removed');

    });
  }
}


const updateBankCheckModal = useModal();
const bankCheckToUpdate = ref<TBankCheck | null>(null);

function setBankCheckToUpdate(bankCheck: TBankCheck) {
  bankCheckToUpdate.value = Object.assign({}, bankCheck);
  updateBankCheckModal.show();
}

function cancelUpdate() {
  updateBankCheckModal.hide();
  // staffToUpdate.value = null;
}

function handleUpdate() {
  updateBankCheckModal.hide();
}

</script>