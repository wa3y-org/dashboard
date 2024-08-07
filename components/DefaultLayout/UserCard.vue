<template>
  <div class="text-center">
    <v-menu v-model="menuModal.isShown.value" :close-on-content-click="false" location="top">
      <template v-slot:activator="{ props }">
        <v-avatar color="indigo" v-bind="props" class="cursor-pointer">
          <v-img :src="user?.avatar"></v-img>
        </v-avatar>
      </template>

      <v-card min-width="300" class="pa-4 my-2">
        <v-list >
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

<script lang="ts" setup>
import { AuthService } from "@/app/modules/users/services/index";
function doLogout() {
  useLogout().logout();
}

const menuModal = useModal();

const user = AuthService.AuthenticatedUser;
</script>

<style></style>
