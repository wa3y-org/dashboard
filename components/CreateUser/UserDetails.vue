<template>
  <div class="my-4">
    <v-text-field rounded="lg" v-model="name" variant="outlined" hide-details="auto"
      placeholder="Enter The name of the user" class="font-weight-bold"
      :error-messages="nameErrors">
      <template v-slot:prepend-inner>
        <div class="mx-2 text-primary text-no-wrap">
          <v-icon>mdi-account</v-icon>
          Name :
        </div>
      </template>
    </v-text-field>
    <div class="my-3"></div>
    <v-text-field rounded="lg" v-model="email" variant="outlined" hide-details="auto" :error-messages="emailErrors"
      placeholder="Enter User email" type="email" class="font-weight-bold">
      <template v-slot:prepend-inner>
        <div class="mx-2 text-primary text-no-wrap">
          <v-icon>mdi-email</v-icon>
          Email :
        </div>
      </template>
    </v-text-field>
    <div class="my-3"></div>
    <v-textarea :error-messages="bioErrors" rounded="lg" v-model="bio" variant="outlined" hide-details="auto" placeholder="Tell us about the user" auto-grow>
      <template v-slot:prepend-inner>
        <div class="mx-2 font-weight-bold text-primary text-no-wrap">
          <v-icon>mdi-account-details</v-icon>
          Bio :
        </div>
      </template>
    </v-textarea>
  </div>
</template>

<script lang="ts" setup>
const name = defineModel('name', { required: true, type: String })
const email = defineModel('email', { required: true, type: String })
const bio = defineModel('bio', { required: true, type: String })


defineProps(['nameErrors', 'emailErrors', 'bioErrors'])
</script>

<style></style>