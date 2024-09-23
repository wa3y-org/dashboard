<template>
  <div class="my-4">
    <loading-from-backend v-if="loading.isLoading.value" />
    <v-card rounded="lg" v-else>
      <v-toolbar color="transparent">
        <v-tabs v-model="tab">
          <v-tab value="volunteer" class="font-weight-black">
            <v-icon size="x-large" class="mx-2">mdi-account-tie</v-icon>
            volunteer
          </v-tab>
         
          <v-spacer></v-spacer>
          <v-tab value="settings" class="font-weight-black">
            <v-icon size="x-large" class="mx-2">mdi-account-settings-outline</v-icon>
            settings
          </v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
        <div class="mx-4">

          <v-btn :to="`/hr/volunteers/${id}/update`" color="info" variant="elevated"
            prepend-icon="mdi-pencil">Update</v-btn>
        </div>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="volunteer" transition="fade-transition">
            <volunteers-volunteer-info :volunteer="volunteer" />
          </v-tabs-window-item>

          

          <v-tabs-window-item value="settings" transition="fade-transition">
            <volunteers-volunteer-settings :volunteer="volunteer" />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import type { VolunteersRecord } from "~/app/pocketbase-types";

const id = useRoute().params.id;

const volunteer: Ref<VolunteersRecord | null> = ref(null)
const { loading, loadOneVolunteer } = useVolunteers();

onMounted(async () => {
  volunteer.value = await loadOneVolunteer(id.toString());
});

const tab = ref('volunteer');
</script>

<style></style>