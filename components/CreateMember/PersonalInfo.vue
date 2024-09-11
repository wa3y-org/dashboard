<template>
  <v-row class="px-4 mt-4">
    <v-col>
      <AvatarPicker v-model:image="member.avatar"
        :pocket-url="usePocketBase().files.getUrl(member, member.avatar || '')" />
    </v-col>
    <v-col cols="8">
      <p class="mt-4"></p>
      <text-field :errors="validationErrors?.name" v-model="member.name" 
      placeholder="Enter the name of the new member"
        name="name" />
      <v-row class="my-3 py-0">
        <v-col class="" cols="6">
          <w-sex-picker v-model="member.sex" />
        </v-col>
        <v-col class="" cols="6">
          <DatePicker name="Birth Date" v-model="member.birth_date" />
        </v-col>
      </v-row>

      <!-- <TextareaField name="Bio" placeholder="Tell us about the new member " /> -->
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import type { MembersRecord, MembersResponse } from "~/app/pocketbase-types";

const member = defineModel<MembersRecord | MembersResponse>({ required: true })

const validSex = ["Male", "Female"]

const validationErrors = inject<{[key: string]: any}>('validationErrors')
</script>

<style></style>