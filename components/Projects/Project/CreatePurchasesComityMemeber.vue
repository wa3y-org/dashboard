<template>
  <div class="pa-4">
    <div class="ma-2 rounded-lg border elevation-4 overflow-hidden">

      <v-expansion-panels :multiple="false" v-model="addMemberPanel" :loading="loading.isLoading.value">
        <v-expansion-panel value="createPostMainPanel" :loading="loading.isLoading.value"
          :disabled="loading.isLoading.value">
          <v-expansion-panel-title class="text-primary font-weight-bold">
            <v-icon>mdi-plus-circle</v-icon>
            <span class="mx-2"></span>
            Add Member
          </v-expansion-panel-title>
          <v-divider></v-divider>
          <v-expansion-panel-text>
            <div class="py-4">
              <SelectEmployee v-model="member.employee" />
              <p class="my-4"></p>
              <v-checkbox v-model="member.can_create" hide-details color="success" label="Can Create Purchase" />
              <v-checkbox v-model="member.can_update_status" hide-details color="success"
                label="Can Update Purchase's Status" />
            </div>
          </v-expansion-panel-text>
          <div v-if="backendError.error && backendError.hasError" class="my-4">
            <v-divider class="my-4"></v-divider>
            <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error"
              v-if="backendError.hasError" />
          </div>
          <v-divider></v-divider>
          <v-expansion-panel-text class="pa-0 ma-0">
            <v-card-actions>
              <v-alert type="error" :value="true" variant="text" v-if="Errors.hasError(validationErrors)">
                Input Validation Error
              </v-alert>
              <v-spacer></v-spacer>
              <SaveCancelBtn :loading="loading.isLoading.value" @cancel="hideAddMemberPanel" @save="save" />
            </v-card-actions>
          </v-expansion-panel-text>
        </v-expansion-panel>

      </v-expansion-panels>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SelectEmployee from '~/components/w/SelectEmployee.vue';


const props = defineProps(['project', 'activity'])

const loading = useLoading();

const emit = defineEmits(['saved'])

const addMemberPanel = ref(null)

const member = ref({
  employee: null,
  can_create: false,
  can_update_status: false,
});

function hideAddMemberPanel() {
  addMemberPanel.value = null
}

const isFirstAttempt = ref(true);
const validationErrors = computed(() => {
  if (isFirstAttempt.value) return {};
  return useProjectPurchasesComity().validate(member.value);
});

const Errors = useErrors();

const backendError = useBackendError();
async function save() {
  isFirstAttempt.value = false;
  backendError.clear();
  if (Errors.hasError(validationErrors.value)) {
    return;
  }

  loading.start();
  const memberClone = {
    employee: member.value.employee?.id,
    can_create: member.value.can_create,
    can_update_status: member.value.can_update_status,
  }
  const response = await useProjectPurchasesComity().create(memberClone, props.project.id || '');
  loading.end();

  if (response.error) {
    backendError.set(response.error);
    return;
  }

  if (response.model) {
    member.value = {
      employee: null,
      can_create: false,
      can_update_status: false,
    };
    isFirstAttempt.value = true;
    hideAddMemberPanel();
    useNuxtApp().$activeModalsBus.$emit('projects:financial_commities:created')
  }
}
</script>

<style></style>