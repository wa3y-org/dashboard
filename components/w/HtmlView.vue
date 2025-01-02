<template>
  <div v-html="html" class="ma-2 my-4">
  </div>
  <!-- <QuillEditor style="min-height: 25px;" read-only class="w-100" theme="bubble" contentType="html" :content="html" /> -->
</template>

<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

defineProps({
  html: {
    type: String,
    required: true
  },
})
</script>

<style></style>