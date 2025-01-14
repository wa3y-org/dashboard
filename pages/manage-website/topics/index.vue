<template>
  <WebsiteTopicsCreate :project="{}" :show="addTopicModal.isShown.value" @cancel="addTopicModal.hide"
    @saved="addTopicModal.hide" />
  <v-card class="my-4" rounded="lg">
    <v-toolbar color="white">
      <v-toolbar-title>
        <v-icon>mdi-tag-multiple-outline</v-icon>
        <span class="mx-2 font-weight-bold">
          Manage Topics & Articles
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" variant="tonal" class="mx-2" rounded="pill" @click="addTopicModal.show">
        <v-icon>mdi-plus-thick</v-icon>
        <span class="mx-2">
          Add Topic
        </span>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="my-4">
      <website-topics-list />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">

const addTopicModal = useModal();
</script>