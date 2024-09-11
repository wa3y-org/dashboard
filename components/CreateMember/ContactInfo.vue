<template>
  <div class="px-4 mt-4">
    <TextField name="Address" v-model="member.address" placeholder="Enter member physical address" />
    <div class="my-2"></div>
    <TextField :errors="validationErrors.email" name="Email" v-model="member.email"
      placeholder="Enter member primary email address" />
    <div class="my-2"></div>
    <MultiPhoneField v-model="member.phone_numbers" placeholder="Type phone number then press enter to add another"
      name="Phone" />
    <div class="my-2"></div>
  </div>
</template>

<script lang="ts" setup>
import type { MembersRecord, MembersResponse } from "~/app/pocketbase-types";

const member = defineModel<MembersRecord | MembersResponse>({ required: true })

const validationErrors = inject('validationErrors')
</script>

<style></style>