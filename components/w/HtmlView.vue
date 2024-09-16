<template>
  <div>
    <QuillEditor style="min-height: 25px;" read-only class="w-100" theme="bubble" contentType="html" :content="html" />
  </div>
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