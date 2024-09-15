<template>
  <div class="my-4">
    <loading-from-backend v-if="loading.isLoading.value" />
    <v-card rounded="lg" v-else>
      <v-toolbar color="transparent">
        <v-tabs v-model="tab">
          <v-tab value="employee" class="font-weight-black">
            <v-icon size="x-large" class="mx-2">mdi-account-tie</v-icon>
            Employee
          </v-tab>
          <v-tab value="salary" class="font-weight-black">
            <v-icon size="x-large" class="mx-2">mdi-archive-outline</v-icon>
            Salary
          </v-tab>
          <v-tab value="authentication" class="font-weight-black">
            <v-icon size="x-large" class="mx-2">mdi-fingerprint</v-icon>
            Authentication
          </v-tab>
          <v-tab value="settings" class="font-weight-black">
            <v-icon size="x-large" class="mx-2">mdi-account-settings-outline</v-icon>
            setting
          </v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
        <div class="mx-4">

          <v-btn :to="`/hr/employees/${id}/update`" color="info" variant="elevated"
            prepend-icon="mdi-pencil">Update</v-btn>
        </div>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="employee" transition="fade-transition">
            <employees-employee-info :employee="employee" />
          </v-tabs-window-item>

          <v-tabs-window-item value="salary" transition="fade-transition">
            <div class="my-2"></div>
            <EmployeesEmployeeSalaryInfo  :employee="employee" />
          </v-tabs-window-item>

          <v-tabs-window-item value="authentication" transition="fade-transition">
            <div class="my-4">
              <EmployeesEmployeeAuthInfo  :employee="employee" />
            </div>

          </v-tabs-window-item>

          <v-tabs-window-item value="settings" transition="fade-transition">
            <employees-employee-settings :employee="employee" />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import type { EmployeesRecord } from "~/app/pocketbase-types";

const id = useRoute().params.id;

const employee: Ref<EmployeesRecord | null> = ref(null)
const { loading, loadOneEmployee } = useEmployees();

onMounted(async () => {
  employee.value = await loadOneEmployee(id.toString());
});

const tab = ref('employee');
</script>

<style></style>