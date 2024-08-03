<template>
  <v-container fluid class="fill-height d-flex justify-center align-center login-page-container">

    <div>
      <v-img class="mx-auto mb-8" max-width="150" src="@/assets/images/wa3y-logo.png" rounded="xl"></v-img>

      <v-card class="mx-auto pa-12 pb-8" elevation="8" width="480" rounded="xl">
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>

        <v-text-field color="primary" placeholder="User Name or Email Address" prepend-inner-icon="mdi-email-outline"
          variant="outlined"></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password

          <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
            Forgot login password?</a>
        </div>

        <v-text-field color="primary" :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'" :type="isPasswordVisible ? 'text' : 'password'"
          placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
          @click:append-inner="togglePasswordVisible"></v-text-field>


        <v-btn block class="mb-8" color="primary" size="x-large">
          Log In
        </v-btn>


      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
const isPasswordVisible = ref(false);
function togglePasswordVisible() {
  isPasswordVisible.value = !isPasswordVisible.value
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