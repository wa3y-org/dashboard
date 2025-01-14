<template>
  <website-articles-create :topic="topic || {}" :project="{}" :show="addArticleModal.isShown.value"
    @cancel="addArticleModal.hide" @saved="addArticleModal.hide" />
  <v-card class="my-4" rounded="lg">
    <v-toolbar color="white">
      <v-toolbar-title>
        <v-icon>mdi-file-multiple-outline</v-icon>
        <span class="mx-2 font-weight-bold">
          Topic : {{ topic?.title }} 
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="info" variant="tonal" class="mx-2" rounded="pill" @click="addArticleModal.show">
        <v-icon>mdi-plus-thick</v-icon>
        <span class="mx-2">
          Add Article
        </span>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="my-4">
      <!-- <LoadingFromBackend v-if="loading.isLoading.value" /> -->
      <website-articles-list :topic="topic || {id: topicId}"/>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { TTopic } from '~/composables/website/index';


const topicId = useRoute().params.id.toString();

const addArticleModal = useModal();

const topic = ref<null | TTopic>(null);

const loading = useLoading();
async function loadTopic() {
  loading.start();
  const response = await useBlog().topics.get.byId(topicId);
  loading.end();

  if (response.model) {
    topic.value = response.model;
  }
}

onMounted(() => {
  loadTopic();
});
</script>