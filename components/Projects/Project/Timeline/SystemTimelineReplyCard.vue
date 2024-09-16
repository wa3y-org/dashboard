<template>
  <w-html-view-dialog :title="post?.title" :show="showPostContentModal.isShown.value" :html="post?.post"
    @close="showPostContentModal.hide" />
  
    <v-card class="elevation-1 border" rounded="lg" width="860">
      <v-card-actions class="text font-weight-bold px-4">
        <v-avatar :image="avatar"></v-avatar>
        {{ creator.name }}
        <v-spacer></v-spacer>
        <span class="text-grey text-body-2">
          {{ calcAge(post?.created) }} -
          <date-view :date="post?.created" :show-time="true" />
        </span>
        <v-btn color="primary" variant="text" icon="mdi-file-document-outline" @click="showPostContentModal.show"></v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-text class="px-4 overflow-hidden">
        <div class="text-truncate rounded-lg overflow-hidden" style="max-height: 2rem;">
          <w-html-view :html="post?.post" />
        </div>
      </v-card-text>
    </v-card>
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