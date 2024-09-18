<template>
  <PayrollPayEmployee @saved="payEmployeeModal.hide" :show="payEmployeeModal.isShown.value" @cancel="payEmployeeModal.hide" :employee="employeeToPay" />
  <div>
    <v-data-table :loading="employeesFetcher.loading.isLoading.value" :headers="headers"
      :items="employeesFetcher.employeesList.value">
      <template v-slot:item.avatar="{ item }">
        <NuxtLink :to="`/hr/employees/${item.id}`">
          <div class="d-flex align-center">
            <v-avatar cover size="94" rounded="lg" class="my-2 elevation-1">

              <v-img :src="getAvatarUrl(item)" alt="employee avatar image" />

            </v-avatar>
            <div class="d-inline-block mx-4 mt-2">
              <span class="font-weight-bold text-nowrap">{{ item.name }}</span>
              <p class="text-grey-darken-2"> {{ item.email }}</p>
              <v-divider class="mt-2"></v-divider>
              <div class="d-flex align-center">

                <span class="font-weight-bold">
                  {{ item.employment_position }} in ({{ item.employment_section }})
                </span>
                <v-chip density="compact" variant="outlined" class="ma-2 font-weight-bold"
                  :color="getStatusColor(item)">{{
                    item.employment_status }}</v-chip>
              </div>

            </div>
          </div>
        </NuxtLink>
      </template>

      <template v-slot:item.basic_salary="{ item }">
        <w-usd color="black" :amount="item.basic_salary" />
      </template>

      <template v-slot:item.allowances="{ item }">
        <w-usd :amount="computeTotalAllowancesAmount(item)" />
      </template>

      <template v-slot:item.deductions="{ item }">
        <w-usd color="red" :amount="computeTotalDeductionsAmount(item)" />
      </template>

      <template v-slot:item.total="{ item }">
        <w-usd color="primary" :amount="computeTotalSalary(item)" />
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn color="primary" prepend-icon="mdi-cash-plus" @click="payEmployee(item)">Pay</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import { type EmployeesRecord, type EmployeesResponse } from "~/app/pocketbase-types";
import type { AuthModel, BaseModel } from "pocketbase";

import moment from "moment";
const employeesFetcher = useEmployees();

onMounted(() => {
  employeesFetcher.loadEmployees();
})

const headers = [
  { title: 'Employee', key: 'avatar', },
  { title: 'Basic', key: 'basic_salary' },
  { title: 'Allowances', key: 'allowances' },
  { title: 'Deductions', key: 'deductions' },
  { title: 'Total', key: 'total' },
  { title: 'Actions', key: 'actions', align: 'end' },
];

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

function computeTotalAllowancesAmount(employee: EmployeesRecord) {
  let total = 0;
  for (let allowance of employee?.expand?.allowances || []) {
    total += allowance.amount;
  }
  return total.toFixed(2);
}

function computeTotalDeductionsAmount(employee: EmployeesRecord) {
  let total = 0;
  for (let deduction of employee?.expand?.deductions || []) {
    total += deduction.amount;
  }
  return total.toFixed(2);
}

function computeTotalSalary(employee: EmployeesRecord) {
  return Number(employee?.basic_salary) +
    Number(computeTotalAllowancesAmount(employee)) -
    Number(computeTotalDeductionsAmount(employee));
}


type TEmployee = EmployeesRecord & EmployeesResponse & BaseModel & AuthModel

const payEmployeeModal = useModal();
const employeeToPay = ref()

function payEmployee(employee: TEmployee) {
  employeeToPay.value = employee;
  payEmployeeModal.show();
}



</script>

<style></style>