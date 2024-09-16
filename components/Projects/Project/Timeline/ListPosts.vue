<template>
  <div class="pa-4">
    <v-timeline side="end" v-for="post of postsList" :key="post.id">
      <ProjectsProjectTimelineUserTimelinePostCard :post="post"
        v-if="post.creator && post.expand && post.expand.creator" />
      <ProjectsProjectTimelineSystemTimelinePostCard :post="post" v-else />
    </v-timeline>
    <v-btn :prepend-icon="isAllItemsLoaded ? 'mdi-check-all' : 'mdi-download'" :loading="loading.isLoading.value"
      :disabled="isAllItemsLoaded" size="large" :color="isAllItemsLoaded ? 'black' : 'primary'" rounded="pill"
      @click="loadMorePostsPosts">

      {{ isAllItemsLoaded ? 'Thats All' : `Load More ${pagination.perPage} posts` }}

    </v-btn>

  </div>
</template>

<script lang="ts" setup>
import { type TTimeLinePost } from "~/composables/timelines/index";
const props = defineProps(['project'])

const postsList = ref<Set<TTimeLinePost>>(new Set());
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
async function loadMorePostsPosts() {
  loading.start();
  pagination.value.perPage + 1
  const response = await useProjectTimeline().getPosts(props.project, pagination.value.page + 1);
  loading.end();
  console.log(response)

  if (response.models) {
    pagination.value = {
      page: response.models.page,
      perPage: response.models.perPage,
      totalItems: response.models.totalItems,
      totalPages: response.models.totalPages
    };
    for (let post of response.models.items) {
      postsList.value.add(Object.assign({}, post));
    }
  }
}

onMounted(loadMorePostsPosts);
</script>

<style></style>