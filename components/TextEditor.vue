<template>
  <v-card variant="outlined" rounded="lg" class="border-md"
    :class="hasErrors ? 'border-error border-xl rounded-xl' : ''">
    <div class="bg-red-lighten-4 pa-4" v-if="hasErrors">
      <ul class="mx-4">
        <li v-for="error of errors"> {{ error }}</li>
      </ul>
    </div>
    <div class="my-4">
      <span class="mx-2 text-primary text-no-wrap font-weight-black">
        <v-icon v-if="icon">{{ icon }}</v-icon>
        {{ name }} :
      </span>
    </div>
    <div class="d-flex align-start">
      <div class="w-100">
        <QuillEditor style="min-height: 200px;" class="w-100" theme="snow" toolbar="full" :options="options"
          contentType="html" v-model:content="model" />
      </div>
    </div>
  </v-card>
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

const hasErrors = computed(() => {
  return props.errors && props.errors.length
});

</script>