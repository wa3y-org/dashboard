<template>
  <select-field :errors="props.errors" v-model="model" name="Section" placeholder="Select employment section" :items="validSections" :props="{
    clearable: true
  }" />
</template>

<script lang="ts" setup>
const model = defineModel()
const props = defineProps(['errors'])
const validSections = ["Section A", "Section B", "Section C"]

</script>

<style></style>