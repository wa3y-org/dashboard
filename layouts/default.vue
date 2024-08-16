<template>
  <v-layout>
    
    <DefaultLayoutNavigationRail />
    

    <v-main class="main-app">
      <v-container class="py-4">
        <NuxtPage />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>


</script>

<style lang="scss" scoped>
.main-app {
  background-color: #F1F5F9;
}

</style>