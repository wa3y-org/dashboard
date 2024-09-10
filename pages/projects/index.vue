<template>
  <v-card class="my-4" rounded="lg">
    <v-toolbar color="transparent">
      <v-toolbar-title class="font-weight-bold">
        <v-icon class="mx-2">mdi-folder-multiple</v-icon>
        Projects List
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" variant="tonal" size="large" to="/projects/new" rounded="lg" prepend-icon="mdi-folder-plus"
        class="mx-4">Create Project</v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-8">
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>

</script>

<style></style>