<template>
  <v-dialog :model-value="show" scrollable persistent :overlay="false" max-width="1080px" transition="dialog-transition">
    <v-card rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar color="transparent">
        <v-toolbar-title>
          <v-icon>mdi-bank-plus</v-icon>
          <span class="mx-2 font-weight-bold">
            Update Asset Data
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

        </v-row>
        <v-row>
          <v-col>
            <number-field :props="{ min: 0 }" :errors="validationErrors.price" v-model="asset.price" name="Price"
              placeholder="Enter Asset Price" />
          </v-col>
          <v-col>
            <text-field :errors="validationErrors.bill_number" v-model="asset.bill_number" name="Bill Number"
              placeholder="Enter Bill Nuber" />
          </v-col>

        </v-row>
        <v-row>
          <v-col>
            <number-field :props="{ min: 0 }" :errors="validationErrors.damage_rate" v-model="asset.damage_rate"
              name="Damage Rate" placeholder="Enter Damage Rate" />
          </v-col>
          <v-col>
            <number-field :props="{ min: 0 }" :errors="validationErrors.book_value" v-model="asset.book_value"
              name="Book Value" placeholder="Enter Asset Book Value" />
          </v-col>

        </v-row>
        <v-row>
          <v-col>
            <SelectField v-model="asset.status" :errors="validationErrors.status" name="Status"
              :items="['New', 'Second', 'Eliminated']" placeholder="Select Status" />
          </v-col>
          <v-col>
            <DatePicker v-model="asset.elmination_date" name="Elimination Date"
              :errors="validationErrors.elmination_date" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor v-model="asset.details" :errors="validationErrors.details" name="Details"
              placeholder="Enter details about the item" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <text-editor v-model="asset.eleminaion_reason" :errors="validationErrors.eleminaion_reason"
              name="Eliminations Reason" placeholder="Enter details about the item" />
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