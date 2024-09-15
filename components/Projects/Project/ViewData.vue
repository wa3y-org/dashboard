<template>
  <div>
    <h1 class="text-ht font-weight-bold my-12 text-center">
      {{ project.title }}
    </h1>
    <v-row class="align-center text-h6 my-8 mx-2 pa-1 border-lg border-primary rounded-lg bg-indigo-lighten-5">
      <v-col>
        <v-icon class="mx-2">mdi-map-marker</v-icon>
        {{ project.place }}
      </v-col>
      <v-divider vertical><v-icon color="grey">mdi-dots-vertical</v-icon></v-divider>
      <v-col class="text-end">
        <DateView :date="project.starting_date" />
        <v-chip size="x-large" density="compact" class="font-weight-black mx-2">
          <v-icon class="mx-2">mdi-calendar-expand-horizontal</v-icon>

          {{ calcDateDiff(project.starting_date, project.end_date) }}
        </v-chip>
        <DateView :date="project.end_date" />

      </v-col>
    </v-row>
  </div>
  <div class="my-12 border-lg rounded-lg mx-1 ">

    <p class="py-4 font-weight-bold text-h6  bg-grey-lighten-4">
      <v-icon class="mx-4">mdi-file-document-outline</v-icon>
      Project Details
    </p>
    <v-divider class="mb-8"></v-divider>
    <WHtmlView :html="project.details" />
  </div>
</template>

<script lang="ts" setup>
import moment from "moment";
const props = defineProps(['project'])

function calcDateDiff(dateOne: string | Date, dateTwo: string | Date) {
  return Math.abs(moment(dateOne).diff(dateTwo, 'days')) + ' Days'
}
</script>

<style></style>