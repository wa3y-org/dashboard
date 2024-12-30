<template>
  <select-field :errors="props.errors" v-model="model" name="Shift" placeholder="Select Employee Shift" :items="validSections" :props="{
    clearable: true
  }" />
</template>

<script lang="ts" setup>
const model = defineModel()
const props = defineProps(['errors'])
const validSections = ["Full-Time", "Part-Time", "Contract"]

</script>

<style></style>