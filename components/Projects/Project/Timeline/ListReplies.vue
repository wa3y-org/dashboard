<template>
  <div class="px-4 py-2">
    <div class="pl-16">
      <ProjectsProjectTimelineCreatePostReply :post="post" />
      <div class="my-6" v-for="reply of repliesList" :key="reply.id">
        <ProjectsProjectTimelineSystemTimelineReplyCard :post="reply" />
      </div>
      <v-btn v-if="!isAllItemsLoaded" prepend-icon="mdi-download" :loading="loading.isLoading.value" size="large"
        color="primary" rounded="pill" @click="loadMoreReplies">

        {{ `Load More ${pagination.perPage} replies` }}

      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type TTimeLinePost } from "~/composables/timelines/index";
const props = defineProps(['post'])

const repliesList = ref<Set<TTimeLinePost>>(new Set());
const pagination = ref({
  page: 0,
  perPage: 5,
  totalItems: 5,
  totalPages: 1
})

const isAllItemsLoaded = computed(() => {
  return pagination.value.page >= pagination.value.totalPages
});

const loading = useLoading();
async function loadMoreReplies() {
  loading.start();
  const response = await useProjectTimeline().getReplies(props.post, pagination.value.page + 1);
  loading.end();
  console.log(response)

  if (response.models) {
    pagination.value = {
      page: response.models.page,
      perPage: response.models.perPage,
      totalItems: response.models.totalItems,
      totalPages: response.models.totalPages
    };
    for (let reply of response.models.items) {
      repliesList.value.add(Object.assign({}, reply));
    }
  }
}

onMounted(() => { 
  loadMoreReplies();
  useNuxtApp().$activeModalsBus.$on(`timeline:posts:${props.post.id}:replies:created`, () => {
    repliesList.value = new Set();
    pagination.value.page = 0;
    loadMoreReplies();
  })
});
</script>

<style></style>