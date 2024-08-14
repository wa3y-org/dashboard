<template>
  <div class="my-4">
    <v-text-field variant="outlined" hide-details="auto" :error-messages="[]" placeholder="Enter The name of the user"
      class="font-weight-bold">
      <template v-slot:prepend-inner>
        <div class="mx-2 text-primary text-no-wrap">
          <v-icon>mdi-account</v-icon>
          Name :
        </div>
      </template>
    </v-text-field>
    <div class="my-2"></div>
    <v-text-field variant="outlined" hide-details="auto" :error-messages="[]" placeholder="Enter User email" type="email"
      class="font-weight-bold">
      <template v-slot:prepend-inner>
        <div class="mx-2 text-primary text-no-wrap">
          <v-icon>mdi-email</v-icon>
          Email :
        </div>
      </template>
    </v-text-field>
    <div class="my-2"></div>
    <v-textarea variant="outlined" hide-details placeholder="Tell us about the user" auto-grow>
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

</script>

<style></style>