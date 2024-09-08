<template>
  <v-row class="px-4 mt-4">
    <v-col>
      <AvatarPicker v-model:image="employee.avatar"
        :pocket-url="usePocketBase().files.getUrl(employee, employee.avatar || '')" />
    </v-col>
    <v-col cols="8">
      <p class="mt-4"></p>
      <text-field :errors="validationErrors.name" v-model="employee.name" placeholder="Enter the name of the new member"
        name="name" />
      <v-row class="my-3 py-0">
        <v-col class="" cols="6">
          <w-sex-picker v-model="employee.sex" />
        </v-col>
        <v-col class="" cols="6">
          <DatePicker name="Birth Date" v-model="employee.birth_date" />
        </v-col>
      </v-row>
      <v-row class="mb-3 mt-0 py-0">
        <v-col cols="6">
          <w-marital-status-picker v-model="employee.marital_status" />
        </v-col>
        <v-col>

          <number-field v-model="employee.number_of_children" :props="{
            min: 0,

          }" placeholder="Enter the number of children" name="children" />

        </v-col>
      </v-row>
      <!-- <TextareaField name="Bio" placeholder="Tell us about the new employee " /> -->
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import type { EmployeesRecord } from "~/app/pocketbase-types";

const employee = defineModel<EmployeesRecord>({ required: true })

const validSex = ["Male", "Female"]

const validationErrors = inject('validationErrors')
</script>

<style></style>