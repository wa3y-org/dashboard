<template>
  <div class="my-1 ma-4" :class="hasError || false ? 'border bg-red-lighten-4 pa-1 rounded-lg' : ''">

    <div class="ma-3 font-weight-bold" v-if="hasError">
      <p v-for="e in errors">{{ e }}</p>
    </div>
    <v-card variant="outlined" rounded="lg" class="border bg-white" :class="hasError ? '' : 'elevation-3'">
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
                <v-checkbox v-if="isSelected(role)" class="d-inline-block" hide-details :model-value="true"
                  color="success"></v-checkbox>
                <v-toolbar-title>
                  {{ role.title }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-chip class="mx-2" :variant="isSelected(role) ? 'flat' : 'tonal'"
                  :color="isSelected(role) ? 'success' : 'grey-darken-3'">{{ role.permissions?.length || 0 }}
                  Granted</v-chip>
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
import type { EmployeesRecord } from "~/app/pocketbase-types";
import equal from "fast-deep-equal";

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
  loadAllRoles();

  if (employee.value.expand && employee.value.expand.roles) {
    for (let role of employee.value.expand.roles) {
      selectedRoles.value.add(Role.fromJson({
        id: role.id,
        title: role.title,
        description: role.description,
        permissions: role.permissions,
        createdAt: new Date(role.created),
        updatedAt: new Date(role.updated),
      }))
    }

    console.log('roles', selectedRoles.value)

  }
});

const employee = defineModel<EmployeesRecord>({ required: true })

const selectedRoles = ref<Set<Role>>(new Set)

watch(selectedRoles.value, () => {
  const ids = [];
  for (let role of selectedRoles.value) {
    ids.push(role.id)
  }

  employee.value.roles = ids;
})

const props = defineProps(['errors'])

const hasError = computed(() => {
  return props.errors?.length || false;
})

function toggleRoleSelection(roleToCheck: Role) {

  for (let role of selectedRoles.value) {
    if (equal(role, roleToCheck)) {
      selectedRoles.value.delete(role);
      return;
    };
  }
  selectedRoles.value.add(roleToCheck)
}

function isSelected(roleToCheck: Role): boolean {
  for (let role of selectedRoles.value) {
    if (equal(role, roleToCheck)) return true;
  }

  return false;
}
</script>

<style></style>