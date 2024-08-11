<template>
  <v-container>
    <v-card class="my-4" rounded="lg" :loading="loading" :disabled="loading">
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


      <v-card-text v-if="backendError">
        <v-alert :title="'Server Error Code : ' + backendError.code" prominent variant="tonal" type="error" :value="true">
          {{ backendError?.message }}
        </v-alert>
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
import { RolesService } from "@/app/modules/users/services/roles/Roles.service";
import { Role } from "@/app/modules/users/domain/models/Roles";
import type { Permission } from "@/app/modules/users/domain/models/Permissions";
import { BackendError } from "@/app/modules/users/services/BackendError";


const router = useRouter();
function cancel() {
  router.back();
}

const title = ref("");
const titleErrors: Ref<string[]> = ref([]);

const description = ref("");
const descriptionErrors: Ref<string[]> = ref([]);

const selectedPermissions: Ref<Set<Permission>> = ref(new Set())
const permissionsErrors: Ref<string[]> = ref([]);

function emptyInput() {
  title.value = "";
  description.value = "";
  selectedPermissions.value.clear();
  resetErrors();
}
/**
 * Set errors to none (empty array)
 */
function resetErrors() {
  backendError.value = null;
  titleErrors.value = [];
  descriptionErrors.value = [];
  permissionsErrors.value = [];
}

const hasInputError: ComputedRef<boolean> = computed(() => {
  if (
    titleErrors.value.length > 0 ||
    descriptionErrors.value.length > 0 ||
    permissionsErrors.value.length > 0
  ) {
    return true;
  }

  else {
    return false;
  }
});


/**
 * validate the input
 */
function validateInput(): boolean {

  resetErrors();

  if (!title.value || title.value.trim() == '') {
    titleErrors.value.push('Enter Valid title')
  }

  if (selectedPermissions.value.size < 1) {
    permissionsErrors.value.push('Select at least one permission');
  }

  return !hasInputError.value;
}

const loading = ref(false);

const createdRole: Ref<Role | null> = ref(null)

const backendError: Ref<BackendError | null> = ref(null)


const isCreated: Ref<boolean> = ref(false)
function showCreatedSuccess() {
  isCreated.value = true;
}

function hideCreatedSuccess() {
  isCreated.value = false;
}

/**
 * Send request to store the role in backends
 */
async function saveRole() {
  hideCreatedSuccess();

  // validate data
  validateInput();

  if (hasInputError.value) return;

  loading.value = true;
  const { role, error } = await RolesService.createRole(title.value, description.value, selectedPermissions.value)
  loading.value = false;

  if (error) {
    backendError.value = error;
    return;
  }

  createdRole.value = role;

  emptyInput();
  showCreatedSuccess();
}
</script>

<style></style>