<template>
  <v-alert rounded="lg" :title="'Server Error Code : ' + backendError.code" prominent variant="tonal" type="error" :value="true">
    {{ backendError.message }}
  </v-alert>
</template>

<script lang="ts" setup>
import { BackendError } from "@/app/modules/users/services/BackendError";

defineProps({
  backendError: {
    type: BackendError,
    required: true
  }
})
</script>

<style></style>