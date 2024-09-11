<template>
  <v-card rounded="lg" class="my-4">
    <v-toolbar color="transparent">
      <v-toolbar-title class="font-weight-bold">
        <v-icon>mdi-account-box-multiple-outline</v-icon>
        Members List
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/hr/members/new" rounded="lg" variant="tonal" class="mx-4" size="large" prepend-icon="mdi-account-plus-outline">
        Create Member
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <MembersList />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>

</script>

<style></style>