<template>
  <v-card class="my-4" rounded="lg">
    <v-toolbar color="white">
      <v-toolbar-title>
        <v-icon>mdi-monitor-account</v-icon>
        <span class="mx-2 font-weight-bold">
          Users' Activities Monitor [HR]
        </span>
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="my-4">
      <ActivitiesMonitorList :categories="hrCategories"></ActivitiesMonitorList>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
//hr, projects, finance, 
// website, employees, members, volunteers, roles, 
// project_activities, assets, donations, expenses, 
// payroll, advances, allowances, deductions, 
// web_topics, web_articles, web_resources

const hrCategories = [
  'employees', 'hr', 'members', 'volunteers', 'roles',
]
</script>