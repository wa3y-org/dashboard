<template>
  <select-field name="Marital Status" placeholder="Select Status" :items="validStatuses" :props="{
    clearable: true
  }" />
</template>

<script lang="ts" setup>
const validStatuses = ["Single", "Marred", "Widowed"]

</script>

<style></style>