<template>
  <select-field name="Sex" placeholder="Select Sex" :items="validSex" :props="{
    clearable: true
  }" />
</template>

<script lang="ts" setup>
const validSex = ["Male", "Female"]

</script>

<style></style>