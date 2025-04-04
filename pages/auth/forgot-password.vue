<template>
  <v-container fluid class="fill-height d-flex justify-center align-center login-page-container">

    <div>
      <v-img class="mx-auto mb-8" max-width="150" src="@/assets/images/wa3y-logo.png" rounded="xl"></v-img>
      <v-form @submit.prevent="resetPassword" @keyup.enter="resetPassword">

        <v-card :loading="loading" class="mx-auto pa-12 pb-8" elevation="8" width="480" rounded="xl">
          <div class="text-subtitle-1 text-medium-emphasis">Email</div>

          <v-text-field :tabindex="1" v-model="identity" color="primary" placeholder="Email Address"
            prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

          <v-alert v-if="hasError" class="mb-6" variant="tonal" type="error" :text="errorMessage" />
          <v-alert v-if="isSuccess" class="mb-6" variant="tonal" type="success">
            {{ successMessage }}
          </v-alert>
          <v-btn :tabindex="3" :loading="loading" block class="mb-8 text-capitalize" color="primary" size="x-large" @click="resetPassword">
            Reset Password
          </v-btn>


        </v-card>

      </v-form>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { pb } from "~/app/modules/users/infrastructure/adapters/pocketbase/Connection";
import { AuthService } from "~/app/modules/users/services";

definePageMeta({
  layout: 'blank'
})

const identity: Ref<string> = ref('');
const loading: Ref<boolean> = ref(false);
const hasError: Ref<boolean> = ref(false);
const errorMessage: Ref<string> = ref('');
const isSuccess: Ref<boolean> = ref(false);
const successMessage: Ref<string> = ref('');

const router = useRouter();

async function resetPassword() {
  resetError();
  loading.value = true;

  try {
    await pb.collection('employees').requestPasswordReset(identity.value);
    // Password reset request sent successfully
    // You might want to show a success message to the user here
    showSuccess("Password reset email sent. Please check your inbox.");
  } catch (error: any) {
    // Handle errors, such as invalid email or network issues
    console.error("Password reset error:", error);
    if (error.status === 400) {
      showError("Invalid email address.");
    } else if (error.status === 404) {
      showError("User not found.");
    } else {
      showError("An error occurred while sending the password reset email.");
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
  // background-color: #12095A;
  background: rgb(34, 120, 195);
  background: -moz-linear-gradient(106deg, rgba(34, 120, 195, 0.8932305344012605) 0%, rgba(164, 45, 253, 0.7195610666141457) 100%);
  background: -webkit-linear-gradient(106deg, rgba(34, 120, 195, 0.8932305344012605) 0%, rgba(164, 45, 253, 0.7195610666141457) 100%);
  background: linear-gradient(106deg, rgba(34, 120, 195, 0.8932305344012605) 0%, rgba(164, 45, 253, 0.7195610666141457) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2278c3", endColorstr="#a42dfd", GradientType=1);
}
</style>
