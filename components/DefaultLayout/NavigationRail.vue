<template>
  <v-navigation-drawer rail-width="92" rail permanent class="pa-4">
    <div class="d-flex justify-space-between flex-column fill-height">
      <div>
        <v-card class="pa-0 ma-0" rounded="lg" to="/">
          <v-img src="@/assets/images/wa3y-logo.png"></v-img>
        </v-card>
      </div>
      <div>
        <div class="rounded-lg text-center modules-bar py-2 mt-4">
          <v-btn variant="plain" class="my-1" color="purple-darken-4" v-for="navMod of navigationModules"
            :icon="navMod.icon" :to="navMod.route" />
        </div>
      </div>
      <div></div>
    </div>
    <template v-slot:append>

      <div class="text-center">
        <v-menu v-model="menuModal.isShown.value" :close-on-content-click="false" location="top">
          <template v-slot:activator="{ props }">
            <v-avatar color="indigo" v-bind="props">
              <v-img :src="user?.avatar"></v-img>
            </v-avatar>
          </template>

          <v-card min-width="300" class="pa-4 my-2">
            <v-list>
              <v-list-item :prepend-avatar="user?.avatar" :title="user?.name" :subtitle="user?.email">

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
</template>

<script lang="ts" setup>
import { AuthService } from "@/app/modules/users/services/index";
function doLogout() {
  useLogout().logout();
}

const menuModal = useModal();

const user = AuthService.AuthenticatedUser;

const navigationModules = [
  {
    name: 'test',
    icon: 'mdi-lock',
    route: '/',
    permission: [],
    children: []
  },
  {
    name: 'test 2',
    icon: 'mdi-account',
    route: '/',
    permission: [],
    children: []
  },
  {
    name: 'test 3',
    icon: 'mdi-book-open-variant-outline',
    route: '/',
    permission: [],
    children: []
  },
  {
    name: 'test 4',
    icon: 'mdi-weather-moonset',
    route: '/',
    permission: [],
    children: []
  },
]
</script>

<style></style>