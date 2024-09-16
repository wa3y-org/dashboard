<template>
  <v-dialog scrollable @click:outside="close" :model-value="show" :fullscreen="fullscreen" :overlay="true"
    :max-width="maxWidth">
    <v-card rounded="lg">
      <v-toolbar color="transparent">
        <v-toolbar-title class="font-weight-bold">
          {{ title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="close" />
      </v-toolbar>

      <v-divider></v-divider>
      <v-card-text class="pa-0 ma-0">
        <w-html-view :html="html" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>


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