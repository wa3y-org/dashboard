<template>
  <v-container>
    <loading-from-backend v-if="loading.isLoading.value" />
    <backend-error-wrapper v-if="backendError.hasError" :backend-error="backendError.error" />
    <v-card v-else-if="!loading.isLoading.value">
      <v-toolbar>
        <v-toolbar-title>
          Update Role
        </v-toolbar-title>
        <v-spacer></v-spacer>
        
        
      </v-toolbar>
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