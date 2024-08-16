<template>
  <v-container>
    <v-card class="my-4" rounded="lg" :loading="roleSaver.status.loading.isLoading.value"
      :disabled="roleSaver.status.loading.isLoading.value">
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
            <v-text-field v-model="roleSaver.data.title.value" variant="outlined" hide-details="auto"
              :error-messages="roleSaver.errors.titleErrors.value" placeholder="Enter Role Title"
              class="font-weight-bold">
              <template v-slot:prepend-inner>
                <div class="mx-2 text-primary text-no-wrap">
                  Title :
                </div>
              </template>
            </v-text-field>
            {{ roleSaver.errors }}
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
          Role has been created
          ( <nuxt-link :to="`/users/roles/${roleSaver.savedRole.value?.id}`">
            {{
              roleSaver.savedRole.value?.title
            }}
          </nuxt-link> )
        </v-alert>
        <v-spacer></v-spacer>
        <v-btn :loading="roleSaver.status.loading.isLoading.value" color="error" rounded="lg" size="x-large"
          class="text-body-1" variant="text" @click="cancel">cancel</v-btn>

        <v-btn :loading="roleSaver.status.loading.isLoading.value" class="px-6" variant="elevated"
          prepend-icon="mdi-check" rounded="lg" color="primary" size="x-large" @click="saveRole">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { RolesService } from "@/app/modules/users/services/roles/Roles.service";

const router = useRouter();
function cancel() {
  router.back();
}

const roleSaver = useSaveRole();

/**
 * Send request to store the role in backends
 */
async function saveRole() {
  await roleSaver.saveRole(RolesService.createRole)
  // roleSaver.emptyInput();
}
</script>

<style></style>