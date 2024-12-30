<template>
  <div>
    <h1 class="text-h4 font-weight-bold my-12 text-center">
      <v-icon>mdi-folder-open</v-icon>
      <p class="my-4">
        {{ project.title }}
      </p>
    </h1>
    <v-row class="align-center text-h6 my-8 mx-2 pa-1 border-lg border-primary rounded-lg bg-indigo-lighten-5">
      <v-col>
        <v-icon class="mx-2">mdi-map-marker</v-icon>
        {{ project.place || 'N/A' }}
      </v-col>
      <v-divider vertical><v-icon color="grey">mdi-dots-vertical</v-icon></v-divider>
      <v-col class="text-end">
        <DateView :date="project.starting_date" />
        <v-chip size="large" density="compact" class="font-weight-black mx-2 text-grey-darken-1">
          <v-icon class="mx-2">mdi-calendar-expand-horizontal</v-icon>

          {{ calcProjectTimeInDays(project.starting_date, project.end_date) }} Days
        </v-chip>
        <DateView :date="project.end_date" />

      </v-col>
    </v-row>
  </div>
  <div class="my-12 border-lg rounded-lg mx-1 ">
    <div>
      <p class="py-4 font-weight-bold text-h6  bg-grey-lighten-4">
        <v-icon class="mx-4">mdi-file-document-outline</v-icon>
        About Project
      </p>
      <v-divider class="mb-8"></v-divider>
      <WHtmlView :html="project.details" />
    </div>

    <div>
      <p class="py-4 font-weight-bold text-h6  bg-grey-lighten-4">
        <v-icon class="mx-4">mdi-file-document-outline</v-icon>
        Objectives
      </p>
      <v-divider class="mb-8"></v-divider>
      <WHtmlView :html="project.objectives" />
    </div>
    <div>
      <p class="py-4 font-weight-bold text-h6  bg-grey-lighten-4">
        <v-icon class="mx-4">mdi-file-document-outline</v-icon>
        Targeted Groups
      </p>
      <v-divider class="mb-8"></v-divider>
      <WHtmlView :html="project.targeted_groups" />
    </div>
    <div>
      <p class="py-4 font-weight-bold text-h6  bg-grey-lighten-4">
        <v-icon class="mx-4">mdi-file-document-outline</v-icon>
        Context-Dependant Topics
      </p>
      <v-divider class="mb-8"></v-divider>
      <WHtmlView :html="project.context_dependant_topics" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from "moment";
const props = defineProps(['project'])

function calcProjectTimeInDays(dateOne: string | Date, dateTwo: string | Date) {
  const diffInDays = Math.abs(moment(dateOne).diff(dateTwo, 'days'));
  if (isNaN(diffInDays)) return 'N/A';
  return diffInDays + 1;
}
</script>

<style></style>