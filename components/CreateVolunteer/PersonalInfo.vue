<template>
  <v-row class="px-4 mt-4">
    <v-col>
      <AvatarPicker v-model:image="volunteer.avatar"
        :pocket-url="usePocketBase().files.getUrl(volunteer, volunteer.avatar || '')" />
    </v-col>
    <v-col cols="8">
      <p class="mt-4"></p>
      <text-field :errors="validationErrors?.name" v-model="volunteer.name" 
      placeholder="Enter the name of the new volunteer"
        name="name" />
      <v-row class="my-3 py-0">
        <v-col class="" cols="6">
          <w-sex-picker v-model="volunteer.sex" />
        </v-col>
        <v-col class="" cols="6">
          <DatePicker name="Birth Date" v-model="volunteer.birth_date" />
        </v-col>
      </v-row>

      <!-- <TextareaField name="Bio" placeholder="Tell us about the new volunteer " /> -->
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import type { VolunteersRecord, VolunteersResponse } from "~/app/pocketbase-types";

const volunteer = defineModel<VolunteersRecord & VolunteersResponse>({ required: true })

const validSex = ["Male", "Female"]

const validationErrors = inject<{[key: string]: any}>('validationErrors')
</script>

<style></style>