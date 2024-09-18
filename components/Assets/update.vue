<template>
  <v-dialog :model-value="show" scrollable persistent :overlay="false" max-width="1080px" transition="dialog-transition">
    <v-card rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar color="transparent">
        <v-toolbar-title>
          <v-icon>mdi-bank-plus</v-icon>
          <span class="mx-2 font-weight-bold">
            Add Asset
          </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="cancel" class="mx-2" />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text class="my-4">
        <v-row>
          <v-col>
            <text-field v-model="asset.title" :errors="validationErrors.title" name="title"
              placeholder="Enter item title" />
          </v-col>
          <v-col>
            <text-field v-model="asset.unit" :errors="validationErrors.unit" name="Unit"
              placeholder="Enter item unit - to measure the item by it" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <number-field :props="{ min: 0 }" :errors="validationErrors.functional_total" v-model="asset.functional_total"
              name="Functional Total" placeholder="Enter the number of functional items" />
          </v-col>
          <v-col>
            <number-field :props="{ min: 0 }" :errors="validationErrors.broken_total" v-model="asset.broken_total"
              name="Damaged Total" placeholder="Enter the number of Damaged items" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor v-model="asset.details" :errors="validationErrors.details" name="Details"
              placeholder="Enter details about the item" />
          </v-col>
        </v-row>
      </v-card-text>
      <div v-if="backendError.error && backendError.hasError" class="my-4">
        <v-divider class="my-4"></v-divider>
        <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error" v-if="backendError.hasError" />
      </div>
      <v-divider></v-divider>
      <v-card-actions class="pa-4">
        <v-alert type="error" :value="true" variant="text" v-if="Errors.hasError(validationErrors)">
          Input Validation Error
        </v-alert>
        <v-spacer></v-spacer>
        <save-cancel-btn :loading="loading.isLoading.value" @cancel="cancel" @save="save" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const props = defineProps(['show', 'asset'])
const emit = defineEmits(['cancel', 'saved'])

function cancel() {
  emit('cancel')
}

const backendError = useBackendError();
const Errors = useErrors();

const Assets = useAssets();

const isFirstAttempt = ref(true);
const validationErrors = computed(() => {
  if (isFirstAttempt.value) return { 'a': [] };
  return Assets.validate(props.asset)
});

const loading = useLoading();
async function save() {
  isFirstAttempt.value = false;
  backendError.clear();

  if (Errors.hasError(validationErrors.value)) return;


  loading.start();
  const { error } = await Assets.update(props.asset);
  loading.end();

  if (error) {
    backendError.set(error);
    return;
  }

  isFirstAttempt.value = true;

  useNuxtApp().$activeModalsBus.$emit('assets:updated');
  emit('saved')
}
</script>

<style></style>