<template>
  <select-field v-model="model" name="Status" placeholder="Select employment status" :items="validStatuses" :props="{
    clearable: true
  }" />
</template>

<script lang="ts" setup>
const model = defineModel()
const validStatuses = ["Active", "Suspended", "Resigned"]

</script>

<style></style>