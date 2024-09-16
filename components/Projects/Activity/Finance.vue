<template>
  <div class="pa-2">
    <ProjectsActivityFinanceDonations :activity="activity" />
    <v-divider class="my-16">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-divider>
    <ProjectsActivityFinanceExpenses :activity="activity" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['activity'])
</script>

<style>

</style>