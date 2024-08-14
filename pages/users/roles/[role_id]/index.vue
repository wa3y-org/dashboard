<template>
  <v-container>
    <loading-from-backend v-if="loadRole.loading.isLoading.value" />
    <backend-error-wrapper v-if="loadRole.backendError.hasError" :backend-error="loadRole.backendError.error!" />
    <v-card v-else-if="!loadRole.loading.isLoading.value">
      <v-toolbar>
        <v-toolbar-title>
          {{ loadRole.role.value?.title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn :to="`/users/roles/${loadRole.role.value?.id}/update`" class="mx-4" color="info" prepend-icon="mdi-pencil"
          variant="text">update</v-btn>
      </v-toolbar>

      <v-card-text>

        {{ loadRole.role.value?.description }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span class="font-weight-black text-h6">
          Permissions
          <v-chip density="compact" class="font-weight-bold" color="green"> {{ loadRole.role.value?.permissions?.length ||
            0 }}
            Granted</v-chip>
        </span>
        <div class="my-4">
          <v-row>
            <v-col class="pa-2 ma-0" cols="12" xl="3" lg="4" md="6" sm="6" xs="12"
              v-for="permission of loadRole.role.value?.permissions">
              <v-checkbox :label="permission" :model-value="true" :value="true" readonly hide-details
                color="success"></v-checkbox>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
      <v-divider color="error"></v-divider>
      <v-card-text>
        <p class="text-error text-h6 font-weight-bold">
          Danger Zone
        </p>
        <div class="ma-4 border rounded-lg">
          <div class="py-4">
            <p class="px-4 text-red text-h6 font-weight-bold">
              Remove
            </p>
            <v-divider class="my-4"></v-divider>
            <div class="px-4">
              <p class="my-4">
                Removing this role is permanent, you cant undo this command
              </p>
              <v-btn color="red" prepend-icon="mdi-delete" variant="outlined" size="large">Remove</v-btn>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>

const loadRole = useLoadRole();

onMounted(async () => {
  await loadRole.load();
});
</script>

<style></style>