<template>
  <div class="ma-2 rounded-lg border elevation-4 overflow-hidden">
    <v-expansion-panels :loading="loading.isLoading.value">
      <v-expansion-panel :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
        <v-expansion-panel-title class="text-primary font-weight-bold">
          <v-icon>mdi-plus-circle</v-icon>
          <span class="mx-2"></span>
          Create New Post
        </v-expansion-panel-title>
        <v-divider></v-divider>
        <v-expansion-panel-text>
          <div class="py-4">
            <text-field v-model="post.title" :errors="validationErrors.title" name="Subject" placeholder="Enter post subject or title" />
            <p class="my-4"></p>
            <text-editor v-model="post.post" :errors="validationErrors.post" name="Details" placeholder="Enter post details" />
          </div>
        </v-expansion-panel-text>
        <div v-if="backendError.error && backendError.hasError" class="my-4">
          <v-divider class="my-4"></v-divider>
          <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error"
            v-if="backendError.hasError" />
        </div>
        <v-divider></v-divider>
        <v-expansion-panel-text>
          <v-card-actions>
            <v-alert type="error" :value="true" variant="text" v-if="Errors.hasError(validationErrors)">
              Input Validation Error
            </v-alert>
            <v-spacer></v-spacer>
            <SaveCancelBtn :loading="loading.isLoading.value" @save="save" />
          </v-card-actions>
        </v-expansion-panel-text>
      </v-expansion-panel>

    </v-expansion-panels>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps(['project'])
const emit = defineEmits(['saved'])


const post = ref({
  post: '',
  title: '',
});

const ProjectTimeline = useProjectTimeline();

const isFirstAttempt = ref(true);
const validationErrors = computed(() => {
  if (isFirstAttempt.value) return {};
  return ProjectTimeline.validatePost(post.value);
});

const Errors = useErrors();

const backendError = useBackendError();
const loading = useLoading();
async function save() {
  isFirstAttempt.value = false;
  backendError.clear();
  if (Errors.hasError(validationErrors.value)) {
    return;
  }

  loading.start();
  const response = await ProjectTimeline.createPost(props.project, post.value);
  loading.end();

  if (response.error) {
    backendError.set(response.error);
    return;
  }

  if (response.model) {
    useNuxtApp().$activeModalsBus.$emit('timeline:post:created')
  }
}
</script>

<style></style>