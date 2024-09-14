<template>
  <div class="pa-2">
    <ProjectsFinanceDonations :project="project" />
    <v-divider class="my-16">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-divider>
    <ProjectsFinanceExpenses :project="project" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['project'])
</script>

<style>

</style>