<template>
  <v-container>
    <loading-from-backend v-if="loadRole.loading.isLoading.value" />
    <backend-error-wrapper v-if="loadRole.backendError.hasError" :backend-error="loadRole.backendError.error" />
    <v-card v-else-if="!loadRole.loading.isLoading.value">
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
            <v-text-field v-model="title" variant="outlined" hide-details="auto" :error-messages="titleErrors"
              placeholder="Enter Role Title" class="font-weight-bold">
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
            <v-textarea v-model="description" variant="outlined" hide-details placeholder="Enter Role Description"
              auto-grow>
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

            <div :class="permissionsErrors.length ? 'border bg-red-lighten-4 pa-1 rounded-lg' : ''">
              <div v-if="permissionsErrors.length" class="text-red-darken-4 font-weight-black pa-4">
                <p v-for="e of permissionsErrors">{{ e }}</p>
              </div>
              <div class="bg-white rounded-lg">
                <create-role-select-permissions v-model="selectedPermissions" />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions class="pa-3">
        <v-alert type="error" :value="true" variant="text" v-if="hasInputError">
          Input Validation Error
        </v-alert>
        <v-alert type="success" :value="true" variant="text" v-if="isCreated">
          Role has been created
          ( <nuxt-link :to="`/users/roles/${createdRole?.id}`">{{ createdRole?.id }}</nuxt-link> )
        </v-alert>
        <v-spacer></v-spacer>
        <v-btn :loading="loading" color="error" rounded="lg" size="x-large" class="text-body-1" variant="text"
          @click="cancel">cancel</v-btn>

        <v-btn :loading="loading" class="px-6" variant="elevated" prepend-icon="mdi-check" rounded="lg" color="primary"
          size="x-large" @click="saveRole">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import type { Permission } from "@/app/modules/users/domain/models/Permissions";
import { Role } from "@/app/modules/users/domain/models/Roles";

const title = ref("");
const titleErrors: Ref<string[]> = ref([]);

const description = ref("");
const descriptionErrors: Ref<string[]> = ref([]);

const selectedPermissions: Ref<Set<Permission>> = ref(new Set())
const permissionsErrors: Ref<string[]> = ref([]);

const loadRole = useLoadRole();

onMounted(async () => {
  await loadRole.load();
  if (!loadRole.backendError.hasError && loadRole.role.value) {
    setRoleData(loadRole.role.value);
  }
});

function setRoleData(role: Role) {
  title.value = role.title;
  description.value = role.description || "";

  for (let p of role.permissions || []) {
    selectedPermissions.value.add(p);
  }

}
</script>

<style></style>