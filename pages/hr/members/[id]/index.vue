<template>
  <div class="my-4">
    <loading-from-backend v-if="loading.isLoading.value" />
    <v-card rounded="lg" v-else>
      <v-toolbar color="transparent">
        <v-tabs v-model="tab">
          <v-tab value="member" class="font-weight-black">
            <v-icon size="x-large" class="mx-2">mdi-account-tie</v-icon>
            member
          </v-tab>
         
          <v-spacer></v-spacer>
          <v-tab value="settings" class="font-weight-black">
            <v-icon size="x-large" class="mx-2">mdi-account-settings-outline</v-icon>
            setting
          </v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
        <div class="mx-4">

          <v-btn :to="`/hr/members/${id}/update`" color="info" variant="elevated"
            prepend-icon="mdi-pencil">Update</v-btn>
        </div>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="member" transition="fade-transition">
            <members-member-info :member="member" />
          </v-tabs-window-item>

          

          <v-tabs-window-item value="settings" transition="fade-transition">
            <members-member-settings :member="member" />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import type { MembersRecord } from "~/app/pocketbase-types";

const id = useRoute().params.id;

const member: Ref<MembersRecord | null> = ref(null)
const { loading, loadOneMember } = useMembers();

onMounted(async () => {
  member.value = await loadOneMember(id.toString());
});

const tab = ref('member');
</script>

<style></style>