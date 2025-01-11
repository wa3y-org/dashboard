<template>
  <div class="pa-4">
    <p class="text-h6 font-weight-bold">
      Purchases Comity
    </p>
    <ProjectsProjectCreatePurchasesComityMemeber :project="project" />
    <v-data-table :headers="headers" :items="commityMembers" item-key="id">
      <template v-slot:item.employee="{ item }">
        <NuxtLink :to="`/hr/employees/${item.expand?.employee.id}`">
          <div class="d-flex align-center">
            <v-avatar cover size="94" rounded="lg" class="my-2 elevation-1">
              <v-img :src="getAvatarUrl(item.expand?.employee)" alt="employee avatar image" />
            </v-avatar>
            <div class="d-inline-block mx-4 mt-2">
              <span class="font-weight-bold text-nowrap">{{ item.expand?.employee.name }}</span>
              <p class="text-grey-darken-2"> {{ item.expand?.employee.email }}</p>
              <v-divider class="mt-2"></v-divider>
              <div class="d-flex align-center">

                <span class="font-weight-bold">
                  {{ item.expand?.employee.employment_position }} in ({{ item.expand?.employee.employment_section }})
                </span>
                <v-chip density="compact" variant="outlined" class="ma-2 font-weight-bold"
                  :color="getStatusColor(item.expand?.employee)">{{
                    item.expand?.employee.employment_status }}</v-chip>
              </div>

            </div>
          </div>
        </NuxtLink>
      </template>
      <template v-slot:item.can_create="{ item }">
        <v-chip color="success" v-if="item.can_create">Can Create</v-chip>
        <v-chip color="error" v-else>Can not Create</v-chip>
      </template>
      <template v-slot:item.can_update_status="{ item }">
        <v-chip color="success" v-if="item.can_update_status">Can Update Status</v-chip>
        <v-chip color="error" v-else>Can not Update Status</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon="mdi-delete" color="error" variant="text" @click="confirmRemove(item)"></v-btn>
      </template>
    </v-data-table>
  </div>

</template>

<script lang="ts" setup>
import type { EmployeesRecord } from '~/app/pocketbase-types';
import { type TProjectFinancialCommity } from '~/composables/financial_commities/index';


const props = defineProps(['project'])


const PurchasesComity = useProjectPurchasesComity();

const headers = [
  { title: 'Member', key: 'employee' },
  { title: 'Can Create', key: 'can_create' },
  { title: 'Can Update Status', key: 'can_update_status' },
  { title: 'Actions', key: 'actions', align: 'end' },
];
const commityMembers = ref<TProjectFinancialCommity[]>([]);

const loading = useLoading();
const backendError = useBackendError();

async function loadMembers() {
  loading.start();
  const response = await PurchasesComity.get.all(props.project?.id);
  loading.end();

  if (response.error) {
    backendError.set(response.error)
    return
  }

  commityMembers.value = response.models || [];
}

onMounted(() => {
  loadMembers();
  useNuxtApp().$activeModalsBus.$on('projects:financial_commities:created', loadMembers);
  useNuxtApp().$activeModalsBus.$on('projects:financial_commities:updated', loadMembers);
  useNuxtApp().$activeModalsBus.$on('projects:financial_commities:removed', loadMembers);
});



function getStatusColor(employee: EmployeesRecord) {
  let color = '';
  switch (employee.employment_status) {
    case "Active":
      color = 'success'
      break;
    case "Suspended":
      color = 'error'
      break;
    case "Resigned":
      color = 'black';
      break;
    case "In_Vacation":
      color = "warning";
      break;
  }
  return color;
};


function getAvatarUrl(employee: EmployeesRecord) {
  return usePocketBase().files.getUrl(employee, employee.avatar || '');
}


const remove = useConfirmRemove();
async function confirmRemove(member: TProjectFinancialCommity) {
  const isConfirmed = (await remove.confirm()).isConfirmed;
  if (isConfirmed) {
    remove.doRemove(async () => {
      console.log(props.project)
      const response = await PurchasesComity.remove(member);
      if (response.error) {
        return
      }
      useNuxtApp().$activeModalsBus.$emit('projects:financial_commities:removed')

    });
  }
}

</script>

<style></style>