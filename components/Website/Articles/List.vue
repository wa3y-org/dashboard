<template>
  <website-articles-update :article="topicToUpdate" :show="updateTopicModal.isShown.value" @cancel="updateTopicModal.hide"
    @saved="updateTopicModal.hide" />
  <div>
    <div v-if="backendError.error && backendError.hasError" class="my-4">
      <v-divider class="my-4"></v-divider>
      <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error" v-if="backendError.hasError" />
    </div>
    <p class="font-weight-bold text-h6 px-4">
      Articles
      <v-btn icon="mdi-refresh" variant="text" @click="loadArticles"></v-btn>
    </p>
    <v-divider class="my-4"></v-divider>
    <v-data-table :headers="headers" :loading="loading.isLoading.value" :items="articlesList">
      <template v-slot:item.title="{ item }">
        <span class="font-weight-bold">{{ item.title }}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="my-2">
          <v-btn size="small" class="mx-2" color="info" variant="tonal" icon="mdi-pencil" rounded="lg"
            @click="updateTopic(item)"></v-btn>

          <v-btn size="small" color="error" variant="text" icon="mdi-delete" @click="confirmRemove(item)"></v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import type { TArticle, TTopic } from '~/composables/website/index';

const headers = [
  { title: 'Title', key: 'title' },
  { title: 'Short Description', key: 'short_description' },
  { title: 'Actions', key: 'actions', align: 'end' },
]

const props = defineProps({
  topic: { type: Object, required: true },
})

const articlesList = ref<TTopic[]>([]);
const ArticlesController = useBlog().articles;

const backendError = useBackendError();
const loading = useLoading();
async function loadArticles() {
  loading.start();
  const response = await ArticlesController.get.byTopic(props.topic || {});
  loading.end();

  if (response.error) {
    backendError.set(response.error);
    return;
  }

  if (response.models) {
    articlesList.value = response.models
  }
}


onMounted(() => {
  loadArticles();
  useNuxtApp().$activeModalsBus.$on('website:blog:articles:created', loadArticles);
  useNuxtApp().$activeModalsBus.$on('website:blog:articles:updated', loadArticles);
  useNuxtApp().$activeModalsBus.$on('website:blog:articles:removed', loadArticles);
});


const Remove = useConfirmRemove();
async function confirmRemove(article: TArticle) {
  const { isConfirmed } = await Remove.confirm();
  if (isConfirmed) {
    await Remove.doRemove(async () => {
      await ArticlesController.remove(article);
      useNuxtApp().$activeModalsBus.$emit('website:blog:articles:removed');
    });
  }
}

const updateTopicModal = useModal();
const topicToUpdate = ref<null | TTopic>(null);
function updateTopic(topic: TTopic) {
  topicToUpdate.value = topic;
  updateTopicModal.show();
}

</script>
