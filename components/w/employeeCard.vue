<template>
  <NuxtLink :to="`/hr/employees/${employee?.id}`">
    <div class="d-flex align-center">
      <v-avatar cover size="94" rounded="xl" class="my-2 elevation-1">
        <v-img :src="getAvatarUrl(employee)" alt="employee avatar image" />
      </v-avatar>
      <div class="d-inline-block mx-4 mt-2">
        <span class="font-weight-bold text-nowrap">{{ employee?.name }}</span>
        <p class="text-grey-darken-2"> {{ employee?.email }}</p>
        <v-divider class="mt-2"></v-divider>
        <div class="d-flex align-center">

          <span class="font-weight-bold">
            {{ employee?.employment_position }} in ({{ employee?.employment_section }})
          </span>
          <v-chip density="compact" variant="outlined" class="ma-2 font-weight-bold"
            :color="getStatusColor(employee)">{{
              employee?.employment_status }}</v-chip>
        </div>

      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { EmployeesRecord } from '~/app/pocketbase-types';

const props = defineProps({
  employee: {
    required: true,
    type: Object
  }
})

function getStatusColor(employee: EmployeesRecord) {
  let color = '';
  switch (employee?.employment_status) {
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