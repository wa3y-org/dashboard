<template>
  <div class="px-4 mt-4">
    
   
    <v-row>
      <v-col>
        <DatePicker v-model="member.starting_date" name="Joining Date" />
      </v-col>
      <v-col>
        <w-select-membership-status :errors="validationErrors.employmentStatus" v-model="member.membership_status" />
      </v-col>
    </v-row>
  </div>
  
</template>

<script lang="ts" setup>
import type { MembersRecord } from "~/app/pocketbase-types";

const member = defineModel<MembersRecord>({ required: true })

const validationErrors = inject('validationErrors')

</script>

<style></style>