<template>
  <v-container fluid class="fill-height d-flex justify-center align-center login-page-container">
    <div>
      <v-img class="mx-auto mb-8" max-width="150" src="@/assets/images/wa3y-logo.png" rounded="xl"></v-img>
      <v-form @submit.prevent="confirmPasswordReset" @keyup.enter="confirmPasswordReset">
        <v-card :loading="loading" class="mx-auto pa-12 pb-8" elevation="8" width="480" rounded="xl">
          <div class="text-subtitle-1 text-medium-emphasis">New Password</div>
          <v-text-field :tabindex="1" v-model="newPassword" color="primary" placeholder="New Password"
            prepend-inner-icon="mdi-lock-outline" :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="isPasswordVisible ? 'text' : 'password'" variant="outlined"
            @click:append-inner="togglePasswordVisible"></v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis">Confirm New Password</div>
          <v-text-field :tabindex="2" v-model="confirmNewPassword" color="primary" placeholder="Confirm New Password"
            prepend-inner-icon="mdi-lock-check-outline" :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="isConfirmPasswordVisible ? 'text' : 'password'" variant="outlined"
            @click:append-inner="toggleConfirmPasswordVisible"></v-text-field>

          <v-alert v-if="hasError" class="mb-6" variant="tonal" type="error" :text="errorMessage" />
          <v-alert v-if="isSuccess" class="mb-6" variant="tonal" type="success">
            {{ successMessage }}
          </v-alert>

          <v-btn :tabindex="3" :loading="loading" block class="mb-8" color="primary" size="x-large"
            @click="confirmPasswordReset">
            Reset Password
          </v-btn>
        </v-card>
      </v-form>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { pb } from "~/app/modules/users/infrastructure/adapters/pocketbase/Connection";

definePageMeta({
  layout: 'blank'
})

const route = useRoute();
const token = route.params.token as string;

const newPassword = ref('');
const confirmNewPassword = ref('');
const loading = ref(false);
const hasError = ref(false);
const errorMessage = ref('');
const isSuccess = ref(false);
const successMessage = ref('');
const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

function togglePasswordVisible() {
  isPasswordVisible.value = !isPasswordVisible.value
}

function toggleConfirmPasswordVisible() {
  isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value
}

async function confirmPasswordReset() {
  resetError();
  if (newPassword.value !== confirmNewPassword.value) {
    showError("Passwords do not match.");
    return;
  }

  loading.value = true;
  try {
    await pb.collection('employees').confirmPasswordReset(token, newPassword.value, confirmNewPassword.value);
    showSuccess("Password reset successfully.");
    // Redirect to login after successful reset
    setTimeout(() => {
      navigateTo('/auth/login');
    }, 2000);
  } catch (error: any) {
    console.error("Password reset confirmation error:", error);
    if (error.status === 400) {
      showError("Invalid or expired token.");
    } else {
      showError("An error occurred while resetting the password.");
    }
  } finally {
    loading.value = false;
  }
}

function resetError() {
  hasError.value = false;
  errorMessage.value = '';
}

function showError(message: string) {
  errorMessage.value = message;
  hasError.value = true;
}

function showSuccess(message: string) {
  successMessage.value = message;
  isSuccess.value = true;
  setTimeout(() => {
    isSuccess.value = false;
    successMessage.value = '';
  }, 5000); // Hide the success message after 5 seconds
}
</script>

<style lang="scss" scoped>
.login-page-container {
  background: rgb(34, 120, 195);
  background: -moz-linear-gradient(106deg, rgba(34, 120, 195, 0.8932305344012605) 0%, rgba(164, 45, 253, 0.7195610666141457) 100%);
  background: -webkit-linear-gradient(106deg, rgba(34, 120, 195, 0.8932305344012605) 0%, rgba(164, 45, 253, 0.7195610666141457) 100%);
  background: linear-gradient(106deg, rgba(34, 120, 195, 0.8932305344012605) 0%, rgba(164, 45, 253, 0.7195610666141457) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2278c3", endColorstr="#a42dfd", GradientType=1);
}
</style>
