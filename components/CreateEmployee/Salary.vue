<template>
  <div>
    <NumberField name="Basic Salary" placeholder="Enter employee basic salary" :props="{
      step: 0.1,
      suffix: 'USD/month',
    }" />
  </div>
  
  <v-divider><h3 class="text-h5 my-12 font-weight-bold">Fixed Allowances</h3></v-divider>
  <v-divider><h3 class="text-h5 my-12 font-weight-bold">Fixed Deductions</h3></v-divider>
  
</template>

<script lang="ts" setup>

</script>

<style></style>