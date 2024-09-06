<template>
  <select-field name="Status" placeholder="Select employment status" :items="validStatuses" :props="{
    clearable: true
  }" />
</template>

<script lang="ts" setup>
const validStatuses = ["Active", "Suspended", "Resigned", "In Vacation"]

</script>

<style></style>