<template>
  <v-container>
    <v-card class="my-4" rounded="lg">
      <v-toolbar color="white">
        <v-toolbar-title color="text-primary">
          <v-icon>mdi-account-plus-outline</v-icon>
          <span class="mx-2 font-weight-bold">
            Create New User
          </span>
        </v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <CreateUserAvatarPicker />
          </v-col>
          <v-col>
            <CreateUserDetails />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <CreateUserSelectRoles />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider class="mt-4"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div class="ma-2">
          <v-btn :loading="false" color="error" rounded="lg" size="x-large" class="text-body-1" variant="text"
            @click="() => { }">cancel</v-btn>

          <v-btn :loading="false" class="px-6" variant="elevated" prepend-icon="mdi-check" rounded="lg" color="primary"
            size="x-large" @click="() => { }">Save</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>


</script>

<style></style>