<template>
  <div class="pa-2">
    <div class="">
      <div class="pa-0 font-weight-bold text-primary border-lg border-info rounded-pill overflow-hidden">
        <v-tabs hide-slider bg-color="" grow size="large" center-active class="pa-0 ma-0 w-100" v-model="tab">
          <v-tab color="blue" size="large" value="budget" rounded="pill" :variant="tab == 'budget' ? 'flat' : 'text'">
            Budget Lines
          </v-tab>
          <v-tab color="blue" size="large" value="donations" rounded="pill" :variant="tab == 'donations' ? 'flat' : 'text'">
            Donations
          </v-tab>
          <v-tab color="blue" size="large" value="requests" rounded="pill" :variant="tab == 'requests' ? 'flat' : 'text'">
            Financial Requests
          </v-tab>
          <v-tab color="blue" size="large" value="purchases" rounded="pill" :variant="tab == 'purchases' ? 'flat' : 'text'">
            Purchases
          </v-tab>
        </v-tabs>
      </div>

      <v-divider color=" primary" vertical class=""></v-divider>
      <div class="w-100 pl-4">
        <v-window v-model="tab" class="pa-0 h-100" style="min-height: 500px;">
          <v-window-item transition="" value="budget">
            <ProjectsBudgetLinesList :project="project" />
          </v-window-item>
          <v-window-item transition="" value="donations">
            <ProjectsFinanceDonations :project="project" />
          </v-window-item>
          <v-window-item transition="" value="requests">
            <ProjectsFinanceRequestsList :project="project" />
          </v-window-item>
          <v-window-item value="purchases">
            <ProjectsFinancePurchasesList :project="project" />
          </v-window-item>
        </v-window>
      </div>
    </div>
  </div>
  <!-- <ProjectsFinanceExpenses :project="project" /> -->
</template>

<script lang="ts" setup>
const props = defineProps(['project'])

const tab = ref(null)
</script>

<style></style>