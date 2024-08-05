<template>
  <v-container fluid class="fill-height d-flex justify-center align-center login-page-container">

    <div>
      <v-img class="mx-auto mb-8" max-width="150" src="@/assets/images/wa3y-logo.png" rounded="xl"></v-img>
      <v-form @submit.prevent="login" @keyup.enter="login">

        <v-card :loading="loading" class="mx-auto pa-12 pb-8" elevation="8"
          width="480" rounded="xl">
          <div class="text-subtitle-1 text-medium-emphasis">Account</div>

          <v-text-field :tabindex="1" v-model="identity" color="primary" placeholder="User Name or Email Address"
            prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            Password

            <nuxt-link :tabindex="4" class="text-caption text-decoration-none text-blue">
              Forgot login password?</nuxt-link>
          </div>

          <v-text-field :tabindex="2" v-model="password" color="primary"
            :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="isPasswordVisible ? 'text' : 'password'" placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline" variant="outlined"
            @click:append-inner="togglePasswordVisible"></v-text-field>

          <v-alert v-if="hasError" class="mb-6" variant="tonal" type="error" :text="errorMessage" />
          <v-alert v-if="isLoginSuccess" class="mb-6" variant="tonal" type="success">
            Login Success : Redirecting ...
          </v-alert>
          <v-btn :tabindex="3" :loading="loading" block class="mb-8" color="primary" size="x-large" @click="login">
            Log In
          </v-btn>


        </v-card>

      </v-form>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { AuthService } from "~/app/modules/users/services";

definePageMeta({
  layout: 'blank'
})

const isPasswordVisible = ref(false);
function togglePasswordVisible() {
  isPasswordVisible.value = !isPasswordVisible.value
}

const isLoginSuccess: Ref<boolean> = ref(false);
function setLoginSuccess() {
  loading.value = true;
  isLoginSuccess.value = true;
  router.replace('/')
}

const identity: Ref<string> = ref('');
const password: Ref<string> = ref('');
const loading: Ref<boolean> = ref(false);
const hasError: Ref<boolean> = ref(false);
const errorMessage: Ref<string> = ref('');


const router = useRouter();

async function login() {
  resetError();

  loading.value = true;
  const { user, error } = await AuthService.login(identity.value, password.value);
  loading.value = false;

  if (error !== null) {
    showError(error.message)
    return
  }

  if (user == null) {
    showError("Something wrong happened, please try again")
    return
  }

  setLoginSuccess();
}

function resetError() {
  hasError.value = false;
  errorMessage.value = '';
}

function showError(message: string) {
  errorMessage.value = message;
  hasError.value = true;
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