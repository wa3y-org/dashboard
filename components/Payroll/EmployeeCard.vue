<template>
  <div class="d-flex align-center justify-space-between">
    <div>
      <NuxtLink :to="`/hr/employees/${employeeData.id}`">
        <div class="d-flex align-center justify-center">

          <v-avatar cover size="124" rounded="lg" class="my-2 elevation-1">

            <v-img :src="getAvatarUrl(employeeData)" alt="employee avatar image" />

          </v-avatar>
          <div class="mx-4"></div>
          <div class="d-inline-block mx-4 mt-2">
            <span class="font-weight-bold text-nowrap">{{ employeeData.name }}</span>
            <p class="text-grey-darken-2"> {{ employeeData.email }}</p>
            <v-divider class="mt-2"></v-divider>
            <div class="d-flex align-center">

              <span class="font-weight-bold">
                {{ employeeData.employment_position }} in ({{ employeeData.employment_section }})
              </span>
              <v-chip density="compact" variant="outlined" class="ma-2 font-weight-bold"
                :color="getStatusColor(employeeData)">{{
                  employeeData.employment_status }}</v-chip>
            </div>

          </div>
        </div>
      </NuxtLink>
      <div class="mt-8"></div>

      <v-table class="border-lg elevation-2 mb-8 border-success rounded-lg font-weight-black ">
        <tr>
          <td class="border-sm pa-4">
            Salary :
            <w-usd color="" :amount="employee?.basic_salary" />
          </td>
          <td class="border-sm pa-4">
            Allowances : <w-usd color="" :amount="computeTotalAllowancesAmount(employeeData)" />
          </td>
        </tr>
        <tr>
          <td class="border-sm pa-4">
            Deductions : <w-usd color="red" :amount="computeTotalDeductionsAmount(employeeData)" />
          </td>
          <td class="border-sm px-4">
            Total: <w-usd color="primary" :amount="computeTotalSalary(employeeData)" /> /month
          </td>
        </tr>
      </v-table>
    </div>
    <v-divider vertical></v-divider>
    <div class="rounded-lg overflow-hidden border-lg border-warning elevation-4">
      <MonthPicker class="rounded-lg overflow-auto border" :default-month="defaultMonth" 
      :default-year="defaultYear"
        @change="setPayrollDate" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MonthPicker } from 'vue-month-picker'
import { type EmployeesRecord, type EmployeesResponse } from "~/app/pocketbase-types";
import { useDate } from 'vuetify'

const props = defineProps({
  employee: {
    type: Object,
    required: true
  }
})
const payroll = defineModel<{
  year: number,
  month: number,
  payed: number,
}>();


const employeeData = computed<TEmployee>(() => { return props.employee });

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
  for (let allowance of employeeData.value?.expand?.allowances || []) {
    total += allowance.amount;
  }
  return total.toFixed(2);
}

function computeTotalDeductionsAmount(employee: EmployeesRecord) {
  let total = 0;
  for (let deduction of employeeData.value?.expand?.deductions || []) {
    total += deduction.amount;
  }
  return total.toFixed(2);
}

function computeTotalSalary(employee: EmployeesRecord) {
  return Number(employeeData.value?.basic_salary) +
    Number(computeTotalAllowancesAmount(employee)) -
    Number(computeTotalDeductionsAmount(employee));
}

function setPayrollDate(datePickerData: any) {
  if (!datePickerData.month || !datePickerData.month || !datePickerData.from) return
  payroll.value.month = Number(datePickerData.monthIndex)
  payroll.value.year = Number(datePickerData.year)
}

const defaultMonth = computed(() => {
  if (payroll && payroll.value && payroll.value.month) return payroll.value.month;
  return useDate().getMonth(new Date) + 1
});
const defaultYear = computed(() => {
  if (payroll && payroll.value && payroll.value.year) return payroll.value.year;
  return useDate().getYear(new Date)
} 
);

</script>

<style></style>