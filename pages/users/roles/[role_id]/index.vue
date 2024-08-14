<template>
  <v-container>
    <loading-from-backend v-if="loading.isLoading.value" />
    <backend-error-wrapper v-if="backendError.hasError" :backend-error="backendError.error" />
    <v-card v-else-if="!loading.isLoading.value">
      <v-toolbar>
        <v-toolbar-title>
          {{ role?.title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="mx-4" color="info" prepend-icon="mdi-pencil" variant="text">update</v-btn>
      </v-toolbar>

      <v-card-text>

        {{ role?.description }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span class="font-weight-black text-h6">
          Permissions
          <v-chip density="compact" class="font-weight-bold" color="green"> {{ role?.permissions?.length || 0 }}
            Granted</v-chip>
        </span>
        <div class="my-4">
          <v-row>
            <v-col class="pa-2 ma-0" cols="12" xl="3" lg="4" md="6" sm="6" xs="12"
              v-for="permission of role?.permissions">
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
          <div class="pa-4">
            <p class="text-red text-h6 font-weight-bold">
              Remove
            </p>
            <p class="my-4">
              Removing this role is permanent, you cant undo this command
            </p>
            <v-btn color="red" prepend-icon="mdi-delete" variant="outlined" size="large">Remove</v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { RolesService } from "@/app/modules/users/services/roles/Roles.service";
import { Role } from "@/app/modules/users/domain/models/Roles";


const route = useRoute();

const loading = useLoading();

const roleId = route.params['role_id'].toString();

const role: Ref<Role | null> = ref(null);
const backendError = useBackendError();

async function loadRole() {
  loading.start();
  const response = await RolesService.fetchOne(roleId);
  loading.end();
  if (response.error) {
    backendError.set(response.error);
    return;
  }

  role.value = response.role;
}

onMounted(() => {
  loadRole();
})
</script>

<style></style>