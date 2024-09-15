<template>
  <div>
    
    <CreateEmployeeSetPassword v-model="employee" :update-mode="updateMode" />
    <div class="my-8"></div>
    <CreateEmployeeSelectRoles :errors="validationErrors.roles"  v-model="employee"/>
  </div>
</template>

<script lang="ts" setup>
import type { EmployeesRecord } from "~/app/pocketbase-types";

const employee = defineModel<EmployeesRecord>({ required: true })

const validationErrors = inject('validationErrors')

const props = defineProps(['updateMode'])
</script>

<style>

</style>