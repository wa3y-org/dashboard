<template>
  <h1>
    Wa3y-dashboard
  </h1>
  <nuxt-link to="/auth">Go to login</nuxt-link>
  <v-btn color="error" @click="logout">logout</v-btn>
</template>

<script lang="ts" setup>
import { AuthService } from "@/app/modules/users/services/auth/Auth.service";

async function logout() {
  await AuthService.instance.logout();
  useRouter().replace('/auth');
}
</script>

<style scoped></style>