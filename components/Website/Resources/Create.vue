<template>
  <v-dialog :model-value="show" scrollable persistent transition="dialog-transition">
    <v-card rounded="xl" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar>
        <v-toolbar-title class="font-weight-bold">
          Add Resource
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="cancel" />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col>
            <text-field :errors="validationErrors.title" v-model="resource.title" name="Title"
              placeholder="Enter Article Title" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <textarea-field rows="3" :errors="validationErrors.embed_script" v-model="resource.embed_script"
              name="Embed" placeholder="<embed script />" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor :errors="validationErrors.full_text" v-model="resource.full_text" name="Post"
              placeholder="Enter Post Full Text" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <select-field :multiple="true" :items="['videos', 'podcasts', 'books', 'reports', 'others']"
              :errors="validationErrors.tags" v-model="resource.tags" name="Tags" placeholder="Select Tags" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-file-input clearable ref="billFilePicker" v-model="resource.attachments" label="Select Attachments"
              multiple min-width="500px" />
          </v-col>
        </v-row>
      </v-card-text>
      <div v-if="backendError.error && backendError.hasError" class="my-4">
        <v-divider class="my-4"></v-divider>
        <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error"
          v-if="backendError.hasError" />
      </div>
      <v-divider></v-divider>
      <v-card-actions class="pa-4">
        <v-alert type="error" :value="true" variant="text" v-if="Errors.hasError(validationErrors)">
          Input Validation Error
        </v-alert>
        <v-spacer></v-spacer>
        <SaveCancelBtn :loading="loading.isLoading.value" @cancel="cancel" @save="save" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const required = true;
const props = defineProps({
  show: { required, type: Boolean }
})

const emit = defineEmits(['cancel', 'saved']);
function cancel() {
  emit('cancel')
}

const resource = ref({
  title: '',
  embed_script: '',
  full_text: '',
  attachments: [],
  tags: [],
})

const WebsiteResourcesController = useWebResources();

const Errors = useErrors();
const isFirstAttempt = ref(true)
const validationErrors = computed<{ [key: string | number | symbol]: any }>(() => {
  if (isFirstAttempt.value) return {};
  return WebsiteResourcesController.validate(resource.value)
});

const loading = useLoading();
const backendError = useBackendError();
async function save() {

  isFirstAttempt.value = false;
  backendError.clear();
  if (Errors.hasError(validationErrors.value)) {
    return;
  }

  loading.start();
  const response = await WebsiteResourcesController.create(resource.value)
  loading.end();



  if (response.error) {

    backendError.set(response.error)
    return;
  }

  if (response.model) {
    isFirstAttempt.value = true;
    resource.value = {
      title: '',
      embed_script: '',
      full_text: '',
      attachments: [],
      tags: [],
    }
    useNuxtApp().$activeModalsBus.$emit('website:resources:created')
    emit('saved')
  }
}

</script>