<template>
  <div class="px-4 mt-4">
    <TextField name="Address" v-model="volunteer.address" placeholder="Enter volunteer physical address" />
    <div class="my-2"></div>
    <TextField :errors="validationErrors.email" name="Email" v-model="volunteer.email"
      placeholder="Enter volunteer primary email address" />
    <div class="my-2"></div>
    <MultiPhoneField v-model="volunteer.phone_numbers" placeholder="Type phone number then press enter to add another"
      name="Phone" />
    <div class="my-2"></div>
  </div>
</template>

<script lang="ts" setup>
import type { VolunteersRecord, VolunteersResponse } from "~/app/pocketbase-types";

const volunteer = defineModel<VolunteersRecord & VolunteersResponse>({ required: true })

const validationErrors = inject('validationErrors')
</script>

<style></style>