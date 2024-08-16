<template>
  <v-container>
    <v-card class="my-4" rounded="lg">
      <v-toolbar color="white" class="py-1">
        <v-toolbar-title color="text-primary">
          <v-icon>mdi-tag-multiple</v-icon>
          <span class="mx-2 font-weight-bold">
            Roles List
          </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="px-4">
          <v-btn to="/users/roles/new" color="primary" class="rounded-lg" variant="tonal">
            <v-icon>mdi-tag-plus</v-icon>
            <span class="mx-2 font-weight-bold">
              Create New Role
            </span>
          </v-btn>
        </div>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text v-if="backendError.hasError">
        <v-alert :title="'Server Error Code : ' + backendError.error?.code" prominent variant="tonal" type="error"
          :value="true">
          {{ backendError.error?.message }}
        </v-alert>
      </v-card-text>
      <v-card-text class="ma-0 pa-0">
        <v-data-table :headers="headers" :items="rolesList" hide-actions class="elevation-1" select-all
          pagination.sync="pagination" item-key="id" :loading="loading.isLoading.value" search="">
          <template v-slot:item.title="{ item }">
            <nuxt-link class="font-weight-black text-button text-capitalize" :to="`/users/roles/${item.id}`">
              <span>{{ item.title }}</span>
            </nuxt-link>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn :to="`/users/roles/${item.id}/update`" color="info" prepend-icon="mdi-pencil"
              variant="text">update</v-btn>
          </template>
          <template v-slot:item.permissions="{ item }">
            <v-chip density="compact" class="font-weight-bold" color="green"> {{ item.permissions?.length || 0 }}
              Granted</v-chip>
          </template>
          <template v-slot:item.updatedAt="{ item }">
            {{ item.updatedAt?.toLocaleString() }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
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


const headers = [
  { title: 'title', key: 'title' },
  { title: 'permissions', key: 'permissions' },
  { title: 'last update', key: 'updatedAt' },
  { title: 'actions', key: 'actions', align: 'end' },
];
</script>

<style></style>