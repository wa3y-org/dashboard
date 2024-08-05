<template>
  <v-layout>
    <v-navigation-drawer rail-width="92" rail permanent class="pa-4">
      <div class="d-flex justify-space-between flex-column fill-height">
        <div>
          <v-img src="@/assets/images/wa3y-logo.png" rounded="lg"></v-img>
          <div class="rounded-lg text-center modules-bar py-2 mt-4">
            <v-btn variant="plain" class="my-1" color="purple-darken-4" v-for="i in 5" icon="mdi-lock" />
          </div>
        </div>
        <div></div>
      </div>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="doLogout" icon="mdi-logout" variant="text" color="error">
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-navigation-drawer permanent>
      <v-list>
        <v-list-item title="Home" value="home"></v-list-item>

        <v-list-item title="Contacts" value="contacts"></v-list-item>

        <v-list-item title="Settings" value="settings"></v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-main class="main-app">
      <NuxtPage />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
function doLogout() {
  useLogout().logout();
}
</script>

<style lang="scss" scoped>
.main-app {
  background-color: #F1F5F9;
}

.modules-bar {
  background-color: #F3E5F500;
}
</style>