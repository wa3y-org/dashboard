<template>
  <w-html-view-dialog :title="post?.title" :show="showPostContentModal.isShown.value" :html="post?.post"
    @close="showPostContentModal.hide" />
  <v-timeline-item size="large">
    <template v-slot:icon>
      <div v-if="creator">
        <v-avatar :image="avatar"></v-avatar>
      </div>
    </template>
    <template v-slot:opposite>
      <div>
        <span class="font-weight-black">{{ calcAge(post?.created) }}</span>
      </div>
    </template>
    <p class="px-8 py-2 font-weight-bold text-grey">
      Creator: {{ creator.name }}
    </p>
    <v-card class="elevation-4 mb-4" rounded="xl" width="960">
      <v-card-actions class="text-h6 font-weight-bold px-4">
        {{ post?.title }}
        <v-spacer></v-spacer>
        <span class="text-grey text-body-2">
          <date-view :date="post?.created" :show-time="true" />
        </span>
        <v-btn color="primary" variant="text" icon="mdi-file-document-outline" @click="showPostContentModal.show"></v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-text class="px-4 overflow-hidden">
        <div class="text-truncate rounded-lg overflow-hidden" style="max-height: 5rem;">
          <w-html-view :html="post?.post" />
        </div>
      </v-card-text>
    </v-card>
    <ProjectsProjectTimelineCreatePostReply :post="post" />

  </v-timeline-item>
</template>

<script lang="ts" setup>
import type { EmployeesResponse, EmployeesRecord } from "~/app/pocketbase-types";
import moment from "moment";
const props = defineProps(['post'])

const showPostContentModal = useModal();

const creator = computed(() => {

  return props.post?.expand?.creator || null;


});



function calcAge(birthDate: string) {
  return moment(birthDate).fromNow(true)
}

function getAvatarUrl(employee: EmployeesRecord) {
  return usePocketBase().files.getUrl(employee, employee.avatar || '');
}

const avatar = computed(() => {
  if (creator.value) {
    return getAvatarUrl(creator.value)
  }
  return '';
});

</script>

<style></style>