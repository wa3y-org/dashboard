<template>
  <div class="px-4 pt-4">
    <NumberField name="Basic Salary" placeholder="Enter employee basic salary" :props="{
      step: 0.1,
      suffix: 'USD/month',
    }" />
  </div>
  <v-divider class="my-8"></v-divider>

  <create-employee-salary-select-allowances class="px-4" />
  <v-divider class="my-8"></v-divider>
  <create-employee-salary-select-deductions class="px-4"   />
</template>

<script lang="ts" setup>

</script>

<style></style>