<template>
  <ProjectsProjectUpdateStaff @saved="handleUpdate" :staff="staffToUpdate" :show="updateStaffModal.isShown.value"
    @cancel="cancelUpdate" />

  <w-html-view-dialog :title="jobDescriptionTitle" :show="jobDescriptionModal.isShown.value" :html="jobDescriptionToShow"
    @close="jobDescriptionModal.hide" />
  <div>
    <v-data-table :headers="headers" :items="staffList" :loading="loading.isLoading.value">
      <template v-slot:item.person="{ item }">
        <ProjectsProjectStaffCard :staffMember="item" />
      </template>

      <template v-slot:item.position="{ item }">
        <span class="font-weight-black text-h6 text-capitalize">
          {{ item.position }}
        </span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn color="primary" variant="text" icon="mdi-file-document-outline"
          @click="showStaffJobDescription(item)"></v-btn>

        <v-btn class="mx-2" color="info" variant="tonal" icon="mdi-pencil" rounded="lg"
          @click="setStaffToUpdate(item)"></v-btn>

        <v-btn color="error" variant="text" icon="mdi-delete" @click="confirmRemove(item)"></v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import { type StaffPerson, type TStaff } from "~/composables/staff/index";

const props = defineProps(['project'])

const loading = useLoading();

const staffList = ref<TStaff[]>([])

const headers = [
  { title: 'Position', key: 'position' },
  { title: 'Person', key: 'person' },
  { title: 'Actions', key: 'actions', align: 'end' },
]

const Staff = useStaff();

async function loadStaff() {
  staffList.value = []
  loading.start();
  const response = await Staff.getProjectStaff(props.project)
  loading.end();

  staffList.value = response.models || [];
}

onMounted(() => {
  loadStaff();
  useNuxtApp().$activeModalsBus.$on('project:staff:created', loadStaff);
  useNuxtApp().$activeModalsBus.$on('project:staff:removed', loadStaff);
  useNuxtApp().$activeModalsBus.$on('project:staff:updated', loadStaff);
});

const Remove = useConfirmRemove();
async function confirmRemove(staff: TStaff) {
  const { isConfirmed } = await Remove.confirm();
  if (isConfirmed) {
    await Remove.doRemove(async () => {
      await Staff.remove(staff.id)
      useNuxtApp().$activeModalsBus.$emit('project:staff:removed');

    });
  }
}

const updateStaffModal = useModal();
const staffToUpdate = ref<TStaff | null>(null);

function setStaffToUpdate(staff: TStaff) {
  staffToUpdate.value = Object.assign({}, staff);
  updateStaffModal.show();
}

function cancelUpdate() {
  updateStaffModal.hide();
  // staffToUpdate.value = null;
}

function handleUpdate() {
  updateStaffModal.hide();
}

const jobDescriptionModal = useModal();
const jobDescriptionToShow = ref<string>('');
const jobDescriptionTitle = ref<string>('');

function showStaffJobDescription(staff: TStaff) {
  jobDescriptionToShow.value = staff.description || '';
  jobDescriptionTitle.value = `
    Job Description : ( ${staff.position} ) - ${staff.person.name}
  `;
  jobDescriptionModal.show();
}
</script>

<style></style>