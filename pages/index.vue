<template>
  <h1>
    Wa3y-dashboard
  </h1>
  <nuxt-link to="/auth">Go to login</nuxt-link>
  <v-btn color="error" @click="logout">logout</v-btn>
</template>

<script lang="ts" setup>
import { AuthService } from "~/app/modules/users/services";


async function logout() {
  await AuthService.logout();
  useRouter().replace('/auth');
}
</script>

<style scoped></style>