<template>
  <v-container class="my-4">
    <loading-from-backend v-if="roleLoader.loading.isLoading.value" />
    <backend-error-wrapper v-if="roleLoader.backendError.hasError" :backend-error="roleLoader.backendError.error!" />
    <v-card v-else-if="!roleLoader.loading.isLoading.value">
      <v-toolbar color="white">
        <v-toolbar-title>
          <v-icon>mdi-tag-edit</v-icon>
          <span class="mx-2 font-weight-bold">
            Update Role
          </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row class="my-0">
          <v-col>
            <v-text-field v-model="roleSaver.data.title.value" variant="outlined" hide-details="auto"
              :error-messages="roleSaver.errors.titleErrors.value" placeholder="Enter Role Title"
              class="font-weight-bold">
              <template v-slot:prepend-inner>
                <div class="mx-2 text-primary text-no-wrap">
                  Title :
                </div>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class="my-0">
          <v-col>
            <v-textarea v-model="roleSaver.data.description.value" variant="outlined" hide-details
              placeholder="Enter Role Description" auto-grow>
              <template v-slot:prepend-inner>
                <div class="mx-2 font-weight-bold text-primary text-no-wrap">
                  Description :
                </div>
              </template>
            </v-textarea>
          </v-col>
        </v-row>
        <v-row class="my-0">
          <v-col>

            <div
              :class="roleSaver.errors.permissionsErrors.value.length ? 'border bg-red-lighten-4 pa-1 rounded-lg' : ''">
              <div v-if="roleSaver.errors.permissionsErrors.value.length"
                class="text-red-darken-4 font-weight-black pa-4">
                <p v-for="e of roleSaver.errors.permissionsErrors.value">{{ e }}</p>
              </div>
              <div class="bg-white rounded-lg">
                <create-role-select-permissions v-model="roleSaver.data.selectedPermissions.value" />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-if="roleSaver.errors.backendError.value">
        <v-alert :title="'Server Error Code : ' + roleSaver.errors.backendError.value.code" prominent variant="tonal"
          type="error" :value="true">
          {{ roleSaver.errors.backendError.value?.message }}
        </v-alert>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-3">
        <v-alert type="error" :value="true" variant="text" v-if="roleSaver.status.hasInputError.value">
          Input Validation Error
        </v-alert>
        <v-alert type="success" :value="true" variant="text" v-if="roleSaver.status.isSaved.value">
          Role has been updated
          ( <nuxt-link :to="`/users/roles/${roleSaver.savedRole.value?.id}`">{{ roleSaver.savedRole.value?.id
          }}</nuxt-link> )
        </v-alert>
        <v-spacer></v-spacer>
        <v-btn :loading="roleSaver.status.loading.isLoading.value" color="error" rounded="lg" size="x-large"
          class="text-body-1" variant="text" @click="cancel">cancel</v-btn>

        <v-btn :loading="roleSaver.status.loading.isLoading.value" class="px-6" variant="elevated"
          prepend-icon="mdi-check" rounded="lg" color="secondary" size="x-large" @click="saveRole">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { Role } from "@/app/modules/users/domain/models/Roles";
import type { SaveRoleResponse } from "~/app/modules/users/domain/ports/RolesRepository";
import { RolesService } from "@/app/modules/users/services/roles/Roles.service";

const roleLoader = useLoadRole();
const roleSaver = useSaveRole();

onMounted(async () => {
  await roleLoader.load();
  if (!roleLoader.backendError.hasError && roleLoader.role.value) {
    setRoleData(roleLoader.role.value);
  }
});

function setRoleData(role: Role) {
  roleSaver.data.title.value = role.title;
  roleSaver.data.description.value = role.description || "";

  for (let p of role.permissions || []) {
    roleSaver.data.selectedPermissions.value.add(p);
  }
}

const router = useRouter();
function cancel() {
  router.back();
}

/**
 * Send request to store the role in backends
 */

async function saveFun(title: string,
  description: string,
  selectedPermissions: Set<string>): Promise<SaveRoleResponse> {
  const permissionsArray: string[] = [];
  for (let p of roleSaver.data.selectedPermissions.value) {
    permissionsArray.push(p);
  }
  return await RolesService.update(roleLoader.role.value?.id!, new Role({
    id: roleLoader.role.value?.id!,
    title: roleSaver.data.title.value,
    description: roleSaver.data.description.value,
    permissions: permissionsArray,
  }));
}
async function saveRole() {
  await roleSaver.saveRole(saveFun);
}



</script>

<style></style>