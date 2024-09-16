<template>
  <ProjectsActivityAddStaff @saved="addStaffModal.hide" :activity="activity" :show="addStaffModal.isShown.value"
    @cancel="addStaffModal.hide" />
  <v-card-actions>
    <span class="font-weight-black text-h6">
      Activity Staff
    </span>
    <v-spacer></v-spacer>
    <v-btn color="primary" rounded="pill" variant="tonal" @click="addStaffModal.show">
      <v-icon class="mx-2">mdi-plus-thick</v-icon>
      <span class="mx-2">
        add staff
      </span>
    </v-btn>
  </v-card-actions>
  <v-divider class="my-4"></v-divider>
  <ProjectsActivityStaffList :activity="activity" />
</template>

<script lang="ts" setup>
const props = defineProps(['activity'])

const addStaffModal = useModal();
</script>

<style></style>