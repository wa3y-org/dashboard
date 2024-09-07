<template>
  <v-row class="px-4 mt-4">
    <v-col>
      <AvatarPicker />
    </v-col>
    <v-col cols="8">
      <p class="mt-4"></p>
      <text-field placeholder="Enter the name of the new member" name="name" />
      <v-row class="my-3 py-0">
        <v-col class="" cols="6">
          <w-sex-picker />
        </v-col>
        <v-col class="" cols="6">
          <DatePicker name="Birth Date" />
        </v-col>
      </v-row>
      <v-row class="mb-3 mt-0 py-0">
        <v-col cols="6">
          <w-marital-status-picker />
        </v-col>
        <v-col>
          <number-field :props="{
            min: 0,
            
          }" placeholder="Enter the number of children" name="children" />

        </v-col>
      </v-row>
      <!-- <TextareaField name="Bio" placeholder="Tell us about the new employee " /> -->
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
const validSex = ["Male", "Female"]
</script>

<style></style>