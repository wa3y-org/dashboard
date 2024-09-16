<template>
  <projects-project-update-activity :activity="activity" :show="updateActivityModal.isShown.value"
    @cancel="updateActivityModal.hide" @saved="handleSave" />
  <v-card rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value" class="my-4">
    <v-toolbar color="transparent">
      <v-tabs v-model="tab">
        <v-tab class="font-weight-black" value="activity">
          <v-icon size="24" class="mx-2">mdi-folder-table-outline</v-icon>
          Activity
        </v-tab>
        <v-tab class="font-weight-black" value="staff">
          <v-icon size="24" class="mx-2">mdi-account-group</v-icon>
          Staff
        </v-tab>
        <v-tab class="font-weight-black" value="finance">
          <v-icon size="24" class="mx-2">mdi-finance</v-icon>
          Finance
        </v-tab>

        <v-tab class="font-weight-black" value="on_going">
          <v-icon size="24" class="mx-2">mdi-dots-horizontal</v-icon>
          On Going
        </v-tab>
        <v-tab class="font-weight-black" value="output">
          <v-icon size="24" class="mx-2">mdi-message-check-outline</v-icon>
          Output
        </v-tab>
        <v-tab class="font-weight-black" value="settings">
          <v-icon size="24" class="mx-2">mdi-folder-settings-outline</v-icon>
          Settings
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-btn @click="updateActivityModal.show" color="info" variant="elevated" prepend-icon="mdi-pencil" class="mx-4"
        rounded="lg">Update</v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="activity" transition="fade-transition">
          <projects-activity-view-data :activity="activity" />
        </v-tabs-window-item>

        <v-tabs-window-item value="staff" transition="fade-transition">
          <projects-activity-staff :activity="activity" />
        </v-tabs-window-item>

        <v-tabs-window-item value="settings" transition="fade-transition">
          <projects-project-activity-settings :activity="activity" />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>

const tab = ref('activity')
const activity = ref();
const activityId = useRoute().params.id;
const updateActivityModal = useModal();

const loading = useLoading();
async function loadActivity() {
  loading.start();
  const response = await useActivities().getOne(activityId.toString());
  loading.end();

  if (response.model) {
    activity.value = response.model
  }
}

onMounted(() => {
  loadActivity();
});

function handleSave() {
  updateActivityModal.hide();
  loadActivity();
}
</script>

<style></style>