<template>
  <v-card variant="outlined" class="px-0 py-0">
    <v-card-actions class="pa-4 text-h6 elevation-0">
      Permissions
      <v-spacer></v-spacer>
      <span class="text-success font-weight-bold">
        {{ permissions.grantedPermissions.value.size }} Granted
      </span>
    </v-card-actions>
    <v-divider color="black"></v-divider>

    <div class="d-flex flex-direction-column align-start">
      <div class="pa-0 font-weight-bold text-primary">
        <v-tabs direction="vertical" bg-color="" grow size="large" center-active class="pa-0 ma-0 w-100" v-model="tab">
          <v-tab color="blue-accent-4" :variant="permissionsSet.name == tab ? 'tonal' : 'text'" size="large"
            v-for="permissionsSet in permissions.systemPermissions" :key="permissionsSet.name"
            :value="permissionsSet.name">
            {{ permissionsSet.name }}
            <v-badge location="center center" rounded="lg"
              :color="permissionsSetsCount.get('users') ? 'success font-weight-bold' : 'transparent text-transparent'"
              :content="permissionsSetsCount.get('users')" inline></v-badge>
          </v-tab>
        </v-tabs>
      </div>
      <v-divider color="primary" vertical class=""></v-divider>
      <div class="w-100">

        <v-window v-model="tab" class="pa-0 h-100">
          <v-window-item transition="fade-transition" v-for="permissionsSet in permissions.systemPermissions"
            :value="permissionsSet.name">
            <v-toolbar density="compact">
              <v-spacer></v-spacer>
              <span class="text-h6 font-weight-black">
                {{ permissionsSet.name }}
              </span>
              <v-spacer></v-spacer>
            </v-toolbar>



            <div class="ma-4" v-for="group of permissionsSet.groups">
              <p class="font-weight-bold text-h6 mt-8 text-capitalize">{{ group.name }} Permissions</p>
              <v-divider class="my-3"></v-divider>
              <v-row>
                <v-col class="pa-2 ma-0" cols="12" xl="3" lg="4" md="6" sm="6" xs="12"
                  v-for="permission of group.permissions">
                  <v-checkbox @update:model-value="permissions.togglePermission(group, permission)"
                    false-icon="mdi-close-box text-error"
                    :color="permissions.isGranted(group, permission) ? 'success' : 'error'" size="x-large" hide-details
                    :model-value="permissions.isGranted(group, permission)">
                    <template v-slot:label>
                      <span
                        :class="permissions.isGranted(group, permission) ? 'font-weight-black text-success' : 'text-error'">
                        {{ permission }}
                      </span>
                    </template>
                  </v-checkbox>
                </v-col>
              </v-row>
            </div>

          </v-window-item>
        </v-window>
      </div>
    </div>

  </v-card>
</template>

<script lang="ts" setup>
const permissions = usePermissionsController();
const tab = ref(null)

const model = defineModel()

function update() {
  model.value = permissions.grantedPermissions.value;
}

watch(() => permissions.grantedPermissions, update, { deep: true });



const permissionsSetsCount = computed(() => {
  const permissionsSetsCounts: Map<string, number> = new Map();
  for (let p of permissions.systemPermissions) {
    permissionsSetsCounts.set(p.name, permissions.countPermissionsSetGrantedPermissions(p));
  }

  return permissionsSetsCounts;
});

</script>

<style></style>