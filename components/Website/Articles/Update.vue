<template>
  <v-dialog :model-value="show" scrollable persistent transition="dialog-transition">
    <v-card rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar>
        <v-toolbar-title class="font-weight-bold">
          Update Article
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="cancel" />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="4" lg="3" xl="3">
            <cover-picker v-model:image="articleData.cover_image"
              :pocket-url="usePocketBase().files.getUrl(props.article, articleData.cover_image || '')" />
          </v-col>
          <v-col>
            <div class="my-2"></div>
            <text-field :errors="validationErrors.title" v-model="articleData.title" name="Title"
              placeholder="Enter Article Title" />
            <div class="my-2"></div>
            <textarea-field rows="11" :errors="validationErrors.short_description"
              v-model="articleData.short_description" name="Description"
              placeholder="Enter Article Short Description" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor :errors="validationErrors.full_text" v-model="articleData.full_text" name="Description"
              placeholder="Enter Article Full Text" />
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
  article: { type: Object, required },
  show: { required, type: Boolean }
})

const emit = defineEmits(['cancel', 'saved']);
function cancel() {
  emit('cancel')
}

const articleData = ref<TTopic>({
  title: '',
  short_description: '',
  full_text: '',
  cover_image: null
});

watch(() => props.show, () => {
  articleData.value = {
    title: props.article?.title || '',
    short_description: props.article?.short_description || '',
    full_text: props.article?.full_text || '',
    cover_image: props.article?.cover_image || null
  }
}, { deep: true });


const ArticlesController = useBlog().articles;

const Errors = useErrors();
const isFirstAttempt = ref(true)
const validationErrors = computed<{ [key: string | number | symbol]: any }>(() => {
  if (isFirstAttempt.value) return {};
  return ArticlesController.validate(articleData.value)
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
  const response = await ArticlesController.update(Object.assign({ id: props.article?.id || '' }, articleData.value));
  loading.end();



  if (response.error) {

    backendError.set(response.error)
    return;
  }

  if (response.model) {
    isFirstAttempt.value = true;
    useNuxtApp().$activeModalsBus.$emit('website:blog:articles:updated')
    emit('saved')
  }
}

</script>