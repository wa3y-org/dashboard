<template>
  <select-field :errors="props.errors" v-model="model" name="Employment Type" placeholder="Select Employment Type" :items="validSections" :props="{
    clearable: true
  }" />
</template>

<script lang="ts" setup>
const model = defineModel()
const props = defineProps(['errors'])
const validSections = ["Organization Employee", "Project Employee"]

</script>

<style></style>