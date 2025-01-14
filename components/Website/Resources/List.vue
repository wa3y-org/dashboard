<template>
  <website-resources-update :resource="resourceToUpdate" :show="updateResourceModal.isShown.value"
    @cancel="updateResourceModal.hide" @saved="updateResourceModal.hide" />
  <div>
    <div v-if="backendError.error && backendError.hasError" class="my-4">
      <v-divider class="my-4"></v-divider>
      <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error" v-if="backendError.hasError" />
    </div>
    <p class="font-weight-bold text-h6 px-4">
      Resources
      <v-btn icon="mdi-refresh" variant="text" @click="loadResources"></v-btn>
    </p>
    <v-divider class="my-4"></v-divider>
    <v-data-table :headers="headers" :loading="loading.isLoading.value" :items="resourcesList">
      <template v-slot:item.title="{ item }">
        <span class="font-weight-bold">{{ item.title }}</span>
      </template>
      <template v-slot:item.tags="{ item }">
        <v-chip class="ma-2" size="small" v-for="tag of item.tags">{{ tag }}</v-chip>
      </template>

      <template v-slot:item.attachments="{ item }">
        {{ item.attachments.length }} File/s
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="my-2">
          <v-btn size="small" class="mx-2" color="info" variant="tonal" icon="mdi-pencil" rounded="lg"
            @click="updateResource(item)"></v-btn>

          <v-btn size="small" color="error" variant="text" icon="mdi-delete" @click="confirmRemove(item)"></v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import type { TArticle, TTopic } from '~/composables/website/index';
import type { TWebsiteResource } from '~/composables/website/resources';

const headers = [
  { title: 'Title', key: 'title' },
  { title: 'Tags', key: 'tags' },
  { title: 'Attachments', key: 'attachments' },
  { title: 'Actions', key: 'actions', align: 'end' },
]

const resourcesList = ref<TWebsiteResource[]>([]);
const WebsiteResourcesController = useWebResources();

const backendError = useBackendError();
const loading = useLoading();
async function loadResources() {
  loading.start();
  const response = await WebsiteResourcesController.get.all();
  loading.end();

  if (response.error) {
    backendError.set(response.error);
    return;
  }

  if (response.models) {
    resourcesList.value = response.models
  }
}


onMounted(() => {
  loadResources();
  useNuxtApp().$activeModalsBus.$on('website:resources:created', loadResources);
  useNuxtApp().$activeModalsBus.$on('website:resources:updated', loadResources);
  useNuxtApp().$activeModalsBus.$on('website:resources:removed', loadResources);
});


const Remove = useConfirmRemove();
async function confirmRemove(resource: TWebsiteResource) {
  const { isConfirmed } = await Remove.confirm();
  if (isConfirmed) {
    await Remove.doRemove(async () => {
      await WebsiteResourcesController.remove(resource);
      useNuxtApp().$activeModalsBus.$emit('website:resources:removed');
    });
  }
}

const updateResourceModal = useModal();
const resourceToUpdate = ref<null | TTopic>(null);
function updateResource(topic: TTopic) {
  resourceToUpdate.value = topic;
  updateResourceModal.show();
}

</script>
