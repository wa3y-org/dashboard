<template>
  <v-container>
    <v-card class="my-4" rounded="lg">
      <v-toolbar color="white">
        <v-toolbar-title color="text-primary">
          <v-icon>mdi-account-plus-outline</v-icon>
          <span class="mx-2 font-weight-bold">
            Create New User
          </span>
        </v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <CreateUserAvatarPicker v-model:image="data.avatarImage.value" />

          </v-col>
          <v-col>
            <CreateUserDetails v-model:name="data.name.value" v-model:email="data.email.value"
              v-model:bio="data.bio.value"
              v-bind="{ nameErrors: errors.nameErrors.value, emailErrors: errors.emailErrors.value, bioErrors: errors.bioErrors.value }" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <CreateUserSelectRoles :errors="errors.selectedRolesErrors"
              v-model:selected-roles="data.selectedRoles.value" />
          </v-col>
        </v-row>
        <v-row v-if="errors.backendError.value">
          <v-col>
            <BackendErrorWrapper :backend-error="errors.backendError.value" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider class="mt-4"></v-divider>
      <v-card-actions>
        <v-alert type="error" :value="true" variant="text" v-if="status.hasInputError.value">
          Input Validation Error
        </v-alert>
        <v-alert type="success" :value="true" variant="text" v-if="status.isSaved.value">
          User has been created
          ( <nuxt-link :to="`/users/${data.savedUser.value?.id}`">{{ data.savedUser.value?.name }}</nuxt-link> )
        </v-alert>
        <v-spacer></v-spacer>
        <div class="ma-2">
          <v-btn :loading="status.loading.isLoading.value" color="error" rounded="lg" size="x-large" class="text-body-1"
            variant="text" @click="cancel">cancel</v-btn>

          <v-btn :loading="status.loading.isLoading.value" class="px-6" variant="elevated" prepend-icon="mdi-check"
            rounded="lg" color="primary" size="x-large" @click="saveNewUser">Save</v-btn>
        </div>
      </v-card-actions>
    </v-card>

  </v-container>
</template>

<script lang="ts" setup>

const router = useRouter();
function cancel() {
  router.back();
}

const { data, errors, status, save, validateInput } = useSaveUser();

async function saveNewUser() {
  validateInput();
  if (!status.hasInputError.value) {
    save("create")
  }
}
</script>

<style></style>