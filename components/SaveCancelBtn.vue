<template>
  <div class="d-inline-block">
    <v-btn :loading="loading" color="error" rounded="lg" size="large" class="text-body-1" variant="text"
      @click="cancel">cancel</v-btn>
    <span class="mx-1"></span>
    <v-btn :loading="loading" class="px-6" variant="elevated" prepend-icon="mdi-check" rounded="lg"
      color="primary" size="large" @click="save">Save</v-btn>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['loading'])

const emit = defineEmits(['save', 'cancel'])

function cancel() {
  emit('cancel')
}

function save() {
  emit('save')
}
</script>

<style></style>