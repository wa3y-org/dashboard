<template>
  <div class="px-4 mt-4">
    <v-row>
      <v-col>
        <w-select-org-section :errors="validationErrors.employmentSection" v-model="employee.employment_section" />
      </v-col>
      <v-col>
        <TextField :errors="validationErrors.employmentPosition" v-model="employee.employment_position" name="Position"
          placeholder="Enter employee position" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <w-select-qualification v-model="employee.qualification" />
      </v-col>
      <v-col>
        <text-field v-model="employee.specialization" name="specialization"
          placeholder="Enter employee specialization" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <DatePicker v-model="employee.starting_date" name="Started At" />
      </v-col>
      <v-col>
        <w-select-employment-status :errors="validationErrors.employmentStatus" v-model="employee.employment_status" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <text-editor name="Job Description" v-model="employee.job_description" />
      </v-col>
    </v-row>
  </div>

</template>

<script lang="ts" setup>
import type { EmployeesRecord } from "~/app/pocketbase-types";

const employee = defineModel<EmployeesRecord>({ required: true })

const validationErrors = inject('validationErrors')

</script>

<style></style>