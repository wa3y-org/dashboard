<template>
  <v-container>
    <v-card class="mt-4" rounded="lg">
      <v-toolbar color="white">
        <v-toolbar-title color="text-primary">
          Create New Role
        </v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row class="my-0">
          <v-col>
            <v-text-field variant="outlined" hide-details placeholder="Enter Role Title" class="font-weight-bold">
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
            <v-textarea variant="outlined" hide-details placeholder="Enter Role Description" auto-grow>
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
            <v-card variant="outlined" class="px-0 py-0">
              <div class="d-flex flex-direction-column align-start">
                <div class="pa-4 font-weight-bold text-primary text-center">
                  Permissions
                  <v-divider class="my-2"></v-divider>
                  0 Granted
                </div>
                <v-divider color="primary" vertical class=""></v-divider>
                <div class="w-100">
                  <v-tabs bg-color="grey-lighten-3" grow size="large" center-active class="pa-0 ma-0" v-model="tab"
                    >
                    <v-tab color="blue-accent-4" :variant="mod.name == tab ? 'tonal' : 'text'" size="large"
                      v-for="mod in permissionsModules" :key="mod.name" :value="mod.name">
                      {{ mod.name }}
                      <v-badge location="center center" rounded="lg" color="success" size="large" content="6"
                        inline></v-badge>
                    </v-tab>
                  </v-tabs>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="pa-3">
        <v-spacer></v-spacer>
        <v-btn color="error" rounded="lg" size="x-large" class="text-body-1" variant="text" @click="cancel">cancel</v-btn>

        <v-btn class="px-6" variant="elevated" prepend-icon="mdi-check" rounded="lg" color="primary"
          size="x-large">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
const router = useRouter();
function cancel() {
  router.back();
}

const tab = ref(null)

// #--> from here you should separate this logic to other files

const permissionsModules = [
  { name: 'Human Resources', permissions: [] },
  { name: 'projects', permissions: [] },
  { name: 'finance', permissions: [] },
  { name: 'reports', permissions: [] },
  { name: 'users', permissions: [] },
];

// #--> end of separation
</script>

<style></style>