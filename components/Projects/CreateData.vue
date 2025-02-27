<template>
  <div>
    <v-row>
      <v-col>
        <text-field :errors="validationErrors.title" v-model="project.title" name="Title"
          placeholder="Enter Project Title" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <date-picker :errors="validationErrors.starting_date" v-model="project.starting_date" name="Starting Date" />
      </v-col>
      <v-col>
        <date-picker :errors="validationErrors.end_date" v-model="project.end_date" name="End Date" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <text-field :errors="validationErrors.place" v-model="project.place" name="Place"
          placeholder="Enter Project place" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <text-editor :errors="validationErrors.details" v-model="project.details" name="About Project"
          placeholder="Enter Project Summary" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <text-editor :errors="validationErrors.objectives" v-model="project.objectives" name="Objectives"
          placeholder="Enter Project Objectives" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <text-editor :errors="validationErrors.targeted_groups" v-model="project.targeted_groups" name="Targeted Group"
          placeholder="Enter Project Targeted Group" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <text-editor :errors="validationErrors.context_dependant_topics" v-model="project.context_dependant_topics"
          name="Context-Dependant topics" placeholder="Enter Project Context-Dependant topics" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <text-editor :errors="validationErrors.narrative_report" v-model="project.narrative_report"
          name="Narrative Report" placeholder="Enter Project Narrative Report" />
      </v-col>
    </v-row>

  </div>
</template>

<script lang="ts" setup>
import type { ProjectsRecord } from "~/app/pocketbase-types";

const project = defineModel<ProjectsRecord>()

const props = defineProps(['validation-errors'])
</script>

<style></style>