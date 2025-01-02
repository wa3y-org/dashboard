<template>
  <div class="pa-2">
    <div class="d-flex flex-direction-column align-start">
      <div class="pa-0 font-weight-bold text-primary">
        <v-tabs direction="vertical" bg-color="" grow size="large" center-active class="pa-0 ma-0 w-100" v-model="tab">
          <v-tab color="blue-accent-4" size="large" value="budget" :variant="tab == 'budget' ? 'tonal' : 'text'">
            Budget Lines
          </v-tab>
          <v-tab color="blue-accent-4" size="large" value="donations" :variant="tab == 'donations' ? 'tonal' : 'text'">
            Donations
          </v-tab>
          <v-tab color="blue-accent-4" size="large" value="requests" :variant="tab == 'requests' ? 'tonal' : 'text'">
            Financial Requests
          </v-tab>
        </v-tabs>
      </div>

      <v-divider color=" primary" vertical class=""></v-divider>
      <div class="w-100 pl-4">
        <v-window v-model="tab" class="pa-0 h-100">
          <v-window-item transition="fade-transition" value="budget">
            <ProjectsBudgetLinesList :project="project" />
          </v-window-item>
          <v-window-item transition="fade-transition" value="donations">
            <ProjectsFinanceDonations :project="project" />
          </v-window-item>
          <v-window-item transition="fade-transition" value="requests">
            <ProjectsFinanceRequestsList :project="project" />
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