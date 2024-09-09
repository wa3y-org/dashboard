<template>
  <div class="px-4 mt-4">
    <TextField name="Address" v-model="employee.address" placeholder="Enter member physical address" />
    <div class="my-2"></div>
    <TextField :errors="validationErrors.email" name="Email" v-model="employee.email"
      placeholder="Enter member primary email address" />
    <div class="my-2"></div>
    <MultiPhoneField v-model="employee.phone_numbers" placeholder="Type phone number then press enter to add another"
      name="Phone" />
    <div class="my-2"></div>
  </div>
</template>

<script lang="ts" setup>
import type { EmployeesRecord } from "~/app/pocketbase-types";

const employee = defineModel<EmployeesRecord>({ required: true })

const validationErrors = inject('validationErrors')
</script>

<style></style>