<template>
  <v-container>
    <v-card class="my-8" rounded="lg">
      <v-toolbar color="white">
        <v-toolbar-title>
          Create New Role
        </v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row class="my-0">
          <v-col>
            <v-text-field variant="outlined" hide-details placeholder="Enter Role Title" class="font-weight-bold">
              <template v-slot:prepend-inner>
                <div class="mx-2 text-purple-darken-4 text-no-wrap">
                  Title:
                </div>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class="my-0">
          <v-col>
            <v-textarea variant="outlined" hide-details placeholder="Enter Role Description" auto-grow>
              <template v-slot:prepend-inner>
                <div class="mx-2 font-weight-bold text-purple-darken-4">
                  Description:
                </div>
              </template>
            </v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="pa-3">
        <v-spacer></v-spacer>
        <v-btn color="error" variant="text">cancel</v-btn>
        <v-btn class="px-6" variant="elevated" prepend-icon="mdi-check" rounded="lg" color="primary"
          size="x-large">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>

</script>

<style></style>