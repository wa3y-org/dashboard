<template>
  <w-html-view-dialog :title="post?.title" :show="showPostContentModal.isShown.value" :html="post?.post"
    @close="showPostContentModal.hide" />
  <v-timeline-item size="large">
    <template v-slot:icon>
      <div >
        <v-icon color="white" >mdi-robot</v-icon>
      </div>
    </template>
    <template v-slot:opposite>
      <v-card width="0" variant="plain" class="mt-4 text-truncate">
      </v-card>
    </template>
    <p class="px-1 py-2 font-weight-bold text-grey">
      System Observation Bot, 
      <span class="font-weight-black">{{ calcAge(post?.created) }}</span>
    </p>
    <v-card flat color="#CCC2" class="mb-4 border-lg" rounded="lg" width="960">
      <v-card-actions class="text-h6 font-weight-bold px-4">
        {{ post?.title }}
        <v-spacer></v-spacer>
        <span class="text-grey text-body-2">
          <date-view :date="post?.created" :show-time="true" />
        </span>
        <v-btn color="primary" variant="text" icon="mdi-file-document-outline" @click="showPostContentModal.show"></v-btn>
      </v-card-actions>
      
    </v-card>
  </v-timeline-item>
</template>

<script lang="ts" setup>
import moment from "moment";

const props = defineProps(['post'])

const showPostContentModal = useModal();

function calcAge(birthDate: string) {
  return moment(birthDate).fromNow(true)
}
</script>

<style></style>