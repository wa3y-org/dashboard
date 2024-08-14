<template>
  <div class="my-1">
    <v-card variant="outlined" rounded="lg" class="border elevation-3">
      <v-toolbar color="transparent">
        <v-toolbar-title>
          <div class="text-primary text-no-wrap font-weight-bold">
            <v-icon>mdi-account-tag-outline</v-icon>
            Select Roles
          </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <span class="mx-4 font-weight-bold text-success text-h6">
          {{ selectedRoles.size }} Selected
        </span>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <div v-if="loading.isLoading.value">
          <loading-from-backend />
        </div>
        <div v-if="backendError.hasError">
          <v-alert :title="'Server Error Code : ' + backendError.error?.code" prominent variant="tonal" type="error"
            :value="true">
            {{ backendError.error?.message }}
          </v-alert>
        </div>
        <v-row>
          <v-col v-for="role of rolesList" :key="role.id" cols="12" xl="4" lg="6" md="12" sm="12" xs="12">
            <v-card @click="toggleRoleSelection(role)" variant="tonal" class="pa-3" rounded="lg"
              :color="isSelected(role) ? 'green' : 'grey-darken-3'">
              <v-toolbar color="transparent" density="compact">
                <v-checkbox v-if="isSelected(role)" class="d-inline-block" hide-details :model-value="true" color="success"></v-checkbox>
                <v-toolbar-title>
                  {{ role.title }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-chip class="mx-2" :variant="isSelected(role) ? 'flat' : 'tonal'"
                :color="isSelected(role) ? 'success' : 'grey-darken-3'">{{ role.permissions?.length || 0 }} Granted</v-chip>
              </v-toolbar>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { RolesService } from "@/app/modules/users/services/roles/Roles.service";
import { Role } from "@/app/modules/users/domain/models/Roles";

const loading = useLoading();

const rolesList: Ref<Role[]> = ref([]);

const backendError = useBackendError();

async function loadAllRoles() {
  loading.start();
  const { roles, error } = await RolesService.getAllRoles();
  loading.end();


  if (error) {
    backendError.set(error);
    return;
  }

  if (roles) {
    rolesList.value = roles;
  }
}

onMounted(() => {
  loadAllRoles()
});

const selectedRoles: Ref<Set<Role>> = ref(new Set());

function toggleRoleSelection(role: Role) {
  if (selectedRoles.value.has(role)) {
    selectedRoles.value.delete(role);
  } else {
    selectedRoles.value.add(role)
  }
}

function isSelected(role: Role): boolean {
  return selectedRoles.value.has(role);
}
</script>

<style></style>