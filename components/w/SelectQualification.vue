<template>
  <select-field name="Qualification" placeholder="Select employment qualification" :items="validQualifications" :props="{
    clearable: true
  }" />
</template>

<script lang="ts" setup>
const validQualifications = [
  "Less thab Heigh School",
  "Heigh School",
  "Diploma",
  "BSd",
  "PHD"
]

</script>

<style></style>