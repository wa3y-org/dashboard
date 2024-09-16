<template>
  <div class="my-2 elevation-2 rounded-lg border border-lg border-primary overflow-hidden">

    <v-expansion-panels :multiple="false" v-model="createPostPanel" :loading="loading.isLoading.value">
      <v-expansion-panel value="createPostMainPanel" :loading="loading.isLoading.value"
        :disabled="loading.isLoading.value">
        <v-expansion-panel-title class="text-primary font-weight-bold">
          <v-icon>mdi-plus-circle</v-icon>
          <span class="mx-2"></span>
          Reply To This Post
        </v-expansion-panel-title>
        <v-expansion-panel-text class="px-0">
          <div class="">
            <!-- <text-field v-model="post.title" :errors="validationErrors.title" name="Subject"
              placeholder="Enter post subject or title" />
            <p class="my-4"></p> -->
            <text-editor v-model="reply.post" :errors="validationErrors.post" name="Reply Details"
              placeholder="Enter post details" />
          </div>
        </v-expansion-panel-text>
        <div v-if="backendError.error && backendError.hasError" class="my-4">
          <v-divider class="my-4"></v-divider>
          <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error"
            v-if="backendError.hasError" />
        </div>
        <v-expansion-panel-text class="pa-0 ma-0">
          <v-card-actions class="pa-0 ma-0">
            <v-alert type="error" :value="true" variant="text" v-if="Errors.hasError(validationErrors)">
              Input Validation Error
            </v-alert>
            <v-spacer></v-spacer>
            <SaveCancelBtn :loading="loading.isLoading.value" @cancel="hideCreatePostMainPanel" @save="save" />
          </v-card-actions>
        </v-expansion-panel-text>
      </v-expansion-panel>

    </v-expansion-panels>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps(['post'])
const emit = defineEmits(['saved'])

const createPostPanel = ref(null)

const reply = ref({
  post: '',
  title: 'Reply To Post',
});

function hideCreatePostMainPanel() {
  createPostPanel.value = null
}

const ProjectTimeline = useProjectTimeline();

const isFirstAttempt = ref(true);
const validationErrors = computed(() => {
  if (isFirstAttempt.value) return {};
  return ProjectTimeline.activity.validatePost(reply.value);
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
  reply.value.title = ` Reply To Post [${props.post.id}]`
  const response = await ProjectTimeline.activity.createReply(props.post, reply.value);
  loading.end();

  if (response.error) {
    backendError.set(response.error);
    return;
  }

  if (response.model) {
    reply.value = {
      post: '',
      title: ` Reply To Post [${props.post.id}]`,
    };
    isFirstAttempt.value = true;
    hideCreatePostMainPanel();
    useNuxtApp().$activeModalsBus.$emit(`timeline:posts:${props.post.id}:replies:created`)
  }
}
</script>

<style></style>