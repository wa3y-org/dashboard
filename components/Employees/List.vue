<template>
  <div>

    <v-data-table :loading="employeesFetcher.loading.isLoading.value" :headers="headers"
      :items="employeesFetcher.employeesList.value">
      <template v-slot:item.avatar="{ item }">
        <div class="d-flex align-center">
          <v-avatar cover size="84" rounded="lg"  class="my-2 elevation-1">

            <v-img :src="getAvatarUrl(item)" alt="employee avatar image" />

          </v-avatar>
          <div class="d-inline-block mx-4">
            <span class="font-weight-bold text-nowrap">{{ item.name }}</span>
            <p class="text-grey-darken-2"> {{ item.email }}</p>
            <p class="mt-2">
              <v-chip density="compact" color="primary" class="px-4" label>
                {{ item.sex }} ({{ calcAge(item.birth_date?.toString() || '') }})
              </v-chip>
            </p>
          </div>
        </div>
      </template>

      <template v-slot:item.position="{ item }">
        <span class="font-weight-bold">
          {{ item.employment_position }} in ({{ item.employment_section }})
        </span>
      </template>

      <template v-slot:item.status="{ item }">
        <v-chip size="large" class="font-weight-bold" :color="getStatusColor(item)">{{ item.employment_status }}</v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import type { EmployeesRecord } from "~/app/pocketbase-types";
import moment from "moment";
const employeesFetcher = useEmployees();

onMounted(() => {
  employeesFetcher.loadEmployees();
})

const headers = [
  { title: 'employee', key: 'avatar', },
  // { title: 'sex', key: 'sex', },
  { title: 'position', key: 'position', },
  { title: 'status', key: 'status', align: 'end' },
];

function calcAge(birthDate: string) {
  return moment(birthDate).fromNow(true)
}

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
</script>

<style></style>