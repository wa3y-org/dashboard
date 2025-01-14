<template>
  <v-dialog :model-value="show" scrollable persistent max-width="1080px" transition="dialog-transition">
    <v-card rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar>
        <v-toolbar-title class="font-weight-bold">
          Update Topic
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="cancel" />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col>
            <text-field :errors="validationErrors.title" v-model="topicData.title" name="Title"
              placeholder="Enter Topic Title" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <textarea-field :errors="validationErrors.description" v-model="topicData.description" name="Description"
              placeholder="Enter Topic description" />
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
import { type TTopic } from '~/composables/website/index';


const required = true;
const props = defineProps({
  topic: { required, type: Object },
  show: { required, type: Boolean }
})

const emit = defineEmits(['cancel', 'saved']);
function cancel() {
  emit('cancel')
}

const topicData = ref<TTopic>({
  title: '',
  description: '',
})

watch(() => props.show, () => {
  topicData.value = {
    title: props.topic?.title || '',
    description: props.topic?.description || '',
  }
}, { deep: true });

const TopicsController = useBlog().topics;

const Errors = useErrors();
const isFirstAttempt = ref(true)
const validationErrors = computed<{ [key: string | number | symbol]: any }>(() => {
  if (isFirstAttempt.value) return {};
  return TopicsController.validate(topicData.value)
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
  const response = await TopicsController.update(Object.assign({ id: props.topic?.id || '' }, topicData.value));
  loading.end();



  if (response.error) {

    backendError.set(response.error)
    return;
  }

  if (response.model) {
    isFirstAttempt.value = true;
    topicData.value = {
      title: '',
      description: '',
    }
    useNuxtApp().$activeModalsBus.$emit('website:blog:topics:updated')
    emit('saved')
  }
}

</script>