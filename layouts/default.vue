<template>
  <v-layout>
    <v-navigation-drawer rail-width="92" rail permanent class="pa-4">
      <div class="d-flex justify-space-between flex-column fill-height">
        <div>
          <v-card class="pa-0 ma-0" rounded="lg" to="/">
            <v-img src="@/assets/images/wa3y-logo.png"></v-img>
          </v-card>
          <div class="rounded-lg text-center modules-bar py-2 mt-4">
            <v-btn variant="plain" class="my-1" color="purple-darken-4" v-for="i in 5" icon="mdi-lock" />
          </div>
        </div>
        <div></div>
      </div>
      <template v-slot:append>

        <div class="text-center">
          <v-menu v-model="menuModal.isShown.value" :close-on-content-click="false" location="top">
            <template v-slot:activator="{ props }">
              <v-avatar color="indigo" v-bind="props">
                <v-img src="@/assets/images/wa3y-logo.png"></v-img>
              </v-avatar>
            </template>

            <v-card min-width="300" class="pa-4 my-2">
              <v-list>
                <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg" title="John Leider"
                  subtitle="Founder of Vuetify">
                  <template v-slot:append>
                    <v-btn icon="mdi-close" color="error" variant="plain" @click="menuModal.hide" />


                  </template>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list>
                <!-- <v-list-item>
                  <v-switch v-model="message" color="purple" label="Enable messages" hide-details></v-switch>
                </v-list-item>

                <v-list-item>
                  <v-switch v-model="hints" color="purple" label="Enable hints" hide-details></v-switch>
                </v-list-item> -->
              </v-list>
              <v-divider></v-divider>
              <v-card-actions class="pa-2">
                <v-btn color="error" block @click="doLogout" variant="tonal" prepend-icon="mdi-logout">Logout</v-btn>
              </v-card-actions>

            </v-card>
          </v-menu>
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

const menuModal = useModal();

</script>

<style lang="scss" scoped>
.main-app {
  background-color: #F1F5F9;
}

.modules-bar {
  background-color: #F3E5F500;
}
</style>