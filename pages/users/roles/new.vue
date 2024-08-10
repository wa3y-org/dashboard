<template>
  <v-container>
    <v-card class="mt-4" rounded="lg">
      <v-toolbar color="white">
        <v-toolbar-title color="text-primary">
          <v-icon>mdi-tag-plus</v-icon>
          <span class="mx-2 font-weight-bold">
            Create New Role
          </span>
        </v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row class="my-0">
          <v-col>
            <v-text-field v-model="name" variant="outlined" hide-details placeholder="Enter Role Title"
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
            <create-role-select-permissions v-model="selectedPermissions" />
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
    {{ selectedPermissions }}
  </v-container>
</template>

<script lang="ts" setup>

const router = useRouter();
function cancel() {
  router.back();
}

const name = ref("");
const description = ref("");
const selectedPermissions = ref(new Set())
</script>

<style></style>