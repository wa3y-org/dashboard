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


const props = defineProps(['project'])


</script>

<style></style>