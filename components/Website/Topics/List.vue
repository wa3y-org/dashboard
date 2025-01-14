<template>
  <website-topics-update :topic="topicToUpdate" :show="updateTopicModal.isShown.value" @cancel="updateTopicModal.hide"
    @saved="updateTopicModal.hide" />
  <div>
    <div v-if="backendError.error && backendError.hasError" class="my-4">
      <v-divider class="my-4"></v-divider>
      <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error" v-if="backendError.hasError" />
    </div>
    <v-data-table :headers="headers" :loading="loading.isLoading.value" :items="topicsList">
      <template v-slot:item.title="{ item }">
        <nuxt-link :to="`/manage-website/topics/${item.id}`">
          <span class="font-weight-bold text-blue">{{ item.title }}</span>
        </nuxt-link>
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
import type { TTopic } from '~/composables/website/index';

const headers = [
  { title: 'Title', key: 'title' },
  { title: 'Description', key: 'description' },
  { title: 'Actions', key: 'actions', align: 'end' },
]

const topicsList = ref<TTopic[]>([]);
const TopicsController = useBlog().topics;

const backendError = useBackendError();
const loading = useLoading();
async function loadTopics() {
  loading.start();
  const response = await TopicsController.get.all();
  loading.end();

  if (response.error) {
    backendError.set(response.error);
    return;
  }

  if (response.models) {
    topicsList.value = response.models
  }
}

onMounted(() => {
  loadTopics();
  useNuxtApp().$activeModalsBus.$on('website:blog:topics:created', loadTopics);
  useNuxtApp().$activeModalsBus.$on('website:blog:topics:updated', loadTopics);
  useNuxtApp().$activeModalsBus.$on('website:blog:topics:removed', loadTopics);
});


const Remove = useConfirmRemove();
async function confirmRemove(topic: TTopic) {
  const { isConfirmed } = await Remove.confirm();
  if (isConfirmed) {
    await Remove.doRemove(async () => {
      await TopicsController.remove(topic);
      useNuxtApp().$activeModalsBus.$emit('website:blog:topics:removed');
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
