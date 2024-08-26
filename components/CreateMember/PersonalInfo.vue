<template>
  <v-row>
    <v-col>
      <AvatarPicker />
    </v-col>
    <v-col cols="8">
      <p class="mt-4"></p>
      <text-field placeholder="Enter the name of the new member" name="name" />
      <v-row class="my-3 py-0">
        <v-col class="">
          <select-field name="Sex" placeholder="Select Sex" :items="validSex" :props="{
            clearable: true
          }" />
        </v-col>
        <v-col class="">
          <DatePicker name="Birth Date" />
        </v-col>
      </v-row>
      <TextareaField name="Bio" placeholder="Tell us about the new member" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
const validSex = ["Male", "Female"]
</script>

<style></style>