<template>
  <projects-activity-finance-create-finance 
  @cancel="addDonationModal.hide" @saved="addDonationModal.hide"
    :show="addDonationModal.isShown.value" :activity="activity" type="donation" />
  <v-card elevation="2" class="border border-success border-lg" rounded="lg">
    <v-toolbar color="transparent">
      <v-toolbar-title class="font-weight-bold text-success">
        Activity Donations
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="success" variant="tonal" class="mx-2" rounded="pill" @click="addDonationModal.show">
        <v-icon>mdi-plus-thick</v-icon>
        <span class="mx-2">
          Add Donation
        </span>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <projects-activity-finance-donations-list :activity="activity" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
const props = defineProps(['activity'])
const addDonationModal = useModal();

</script>

<style></style>