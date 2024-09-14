<template>
  <v-dialog @click:outside="close" :model-value="show" :fullscreen="fullscreen" :overlay="true" :max-width="maxWidth">
    <v-card rounded="lg">
      <v-toolbar color="transparent">
        <v-toolbar-title class="font-weight-bold">
          {{ title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="close" />
      </v-toolbar>

      <v-divider></v-divider>
      <v-card-text>
        <QuillEditor  style="min-height: 200px;" read-only class="w-100 elevation-4 pa-4 rounded-lg" theme="bubble" contentType="html" :content="html" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


defineProps({
  html: {
    type: String,
    required: true
  },
  show: {
    type: Boolean,
    required: true,
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  maxWidth: {
    type: String,
    default: '1080px'
  },
  title: {
    type: String
  }
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

<style></style>