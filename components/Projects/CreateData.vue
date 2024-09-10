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
        <text-editor :errors="validationErrors.details" v-model="project.details" name="Details"
          placeholder="Enter Project Details" />
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