<template>
  <div>
    <h1 class="text-h4 font-weight-bold my-8">
      <p class="ma-2">
        <v-icon class="mx-2">mdi-timeline-clock-outline</v-icon>
        Users Activities in Project 
      </p>
    </h1>
    <ProjectsProjectTimelineCreatePost :project="project" />
    <ProjectsProjectTimelineListPosts :project="project" />
    
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