<template>
  <QuillEditor style="min-height: 200px;" class="w-100" theme="snow" toolbar="full" :options="options" contentType="html"
    v-model:content="model" />
</template>


<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const model = defineModel<string>();

const props = defineProps(['errors', 'placeholder', 'name', 'icon', 'props'])

const options = computed(() => {
  return {
    theme: "bubble",
    placeholder: props.placeholder || "Write here"
  }
})

</script>