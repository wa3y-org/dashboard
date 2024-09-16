<template>
  <div>
    <h1 class="text-h5 font-weight-bold my-8">
      <p class="ma-2">
        <v-icon class="mx-2">mdi-timeline-clock-outline</v-icon>
        Users Activities 
      </p>
    </h1>
    <ProjectsActivityTimelineCreatePost :activity="activity" />
    <ProjectsActivityTimelineListPosts :activity="activity" />
    
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['activity'])

</script>

<style></style>