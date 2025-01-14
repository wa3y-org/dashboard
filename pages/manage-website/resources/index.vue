<template>
  <website-resources-create :project="{}" :show="addResourceModal.isShown.value" @cancel="addResourceModal.hide"
    @saved="addResourceModal.hide" />
  <v-card class="my-4" rounded="lg">
    <v-toolbar color="white">
      <v-toolbar-title>
        <v-icon>mdi-attachment</v-icon>
        <span class="mx-2 font-weight-bold">
          Resources
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" variant="tonal" class="mx-2" rounded="pill" @click="addResourceModal.show">
        <v-icon>mdi-plus-thick</v-icon>
        <span class="mx-2">
          Add Resource
        </span>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="my-4">
      <website-resources-list />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">

const addResourceModal = useModal();
</script>