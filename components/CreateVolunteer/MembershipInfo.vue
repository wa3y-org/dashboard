<template>
  <div class="px-4 mt-4">
    
   
    <v-row>
      <v-col>
        <DatePicker v-model="volunteer.starting_date" name="Joining Date" />
      </v-col>
      <v-col>
        <w-select-membership-status :errors="validationErrors.employmentStatus" v-model="volunteer.membership_status" />
      </v-col>
    </v-row>
  </div>
  
</template>

<script lang="ts" setup>
import type { VolunteersRecord } from "~/app/pocketbase-types";

const volunteer = defineModel<VolunteersRecord>({ required: true })

const validationErrors = inject('validationErrors')

</script>

<style></style>