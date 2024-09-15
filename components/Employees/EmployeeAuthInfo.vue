<template>
  <div class="px-2">
    <h1 class="font-weight-bold mx-2 my-6">
      Employee Roles
    </h1>
    <v-expansion-panels elevation="4">
      <v-expansion-panel v-for="role of roles" :key="role.id" class="rounded-lg">
        <v-expansion-panel-title>
          <span class="mx-4">
            <nuxt-link class="font-weight-black text-button text-capitalize" :to="`/users/roles/${role.id}`">
              <span>{{ role.title }}</span>
            </nuxt-link>
          </span>
          <v-spacer></v-spacer>
          <v-chip density="compact" class="font-weight-bold" color="green"> {{ role.permissions?.length || 0 }}
            Granted</v-chip>
        </v-expansion-panel-title>
        <v-divider></v-divider>
        <v-expansion-panel-text>
          <div class="ma-4">
            <nuxt-link class="font-weight-black text-button text-capitalize" :to="`/users/roles/${role.id}`">
              <v-icon>mdi-link</v-icon>
              <span class="mx-2"> {{ role.title }}</span>
            </nuxt-link>
          </div>
          <v-divider></v-divider>
          <v-row>
            <v-col class="pa-2 ma-0" cols="12" xl="3" lg="4" md="6" sm="6" xs="12" v-for="permission of role.permissions">
              <v-checkbox :label="permission" :model-value="true" :value="true" readonly hide-details
                color="success"></v-checkbox>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <h1 class="font-weight-bold mx-2 mb-6 mt-12">
      Employee Permissions
      <v-chip density="compact" size="large" class="font-weight-bold mx-3" color="green">
        {{ allPermissions.size || 0 }} Granted
      </v-chip>
    </h1>
    <v-divider class="mb-4"></v-divider>
    <div>
      <v-row>
        <v-col class="pa-2 ma-0" cols="12" xl="3" lg="4" md="6" sm="6" xs="12" v-for="permission of allPermissions">
          <v-checkbox :label="permission" :model-value="true" :value="true" readonly hide-details
            color="success"></v-checkbox>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['employee'])

const roles = computed(() => {
  if (props.employee.expand && props.employee.expand.roles) {
    return props.employee.expand.roles;
  }
  return [];
});

const allPermissions = computed<Set<string>>(() => {
  const permissions = new Set<string>();
  for (let role of roles.value) {
    for (let permission of role.permissions) {
      permissions.add(permission)
    }
  }

  return permissions;
});


</script>

<style></style>