<template>
  <div class="px-4 pt-4">
    <NumberField :errors="validationErrors.basicSalary" v-model="employee.basic_salary" name="Basic Salary" placeholder="Enter employee basic salary" :props="{
      step: 0.1,
      suffix: 'USD/month',
    }" />
  </div>
  <v-divider class="my-8"></v-divider>
  <create-employee-salary-select-allowances v-model="employee" class="px-4" />
  <v-divider class="my-8"></v-divider>
  <create-employee-salary-select-deductions v-model="employee" class="px-4" />
</template>

<script lang="ts" setup>
import type { EmployeesRecord } from "~/app/pocketbase-types";

const employee = defineModel<EmployeesRecord>({ required: true })

const validationErrors = inject('validationErrors')

</script>

<style></style>