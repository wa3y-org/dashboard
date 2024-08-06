<template>
  <v-layout>
    
    <DefaultLayoutNavigationRail />
    <DefaultLayoutDrawer />

    <v-main class="main-app">
      <NuxtPage />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>


</script>

<style lang="scss" scoped>
.main-app {
  background-color: #F1F5F9;
}

.modules-bar {
  background-color: #F3E5F500;
}
</style>