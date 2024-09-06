<template>
  <select-field name="Section" placeholder="Select employment section" :items="validSections" :props="{
    clearable: true
  }" />
</template>

<script lang="ts" setup>
const validSections = ["Section A", "Section B", "Section C"]

</script>

<style></style>