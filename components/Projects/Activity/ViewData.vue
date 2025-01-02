<template>
  <div>
    <div class="font-weight-bold my-8 mx-2 align-center elevation-4 rounded-lg py-5">

      <div class="text-h5 px-4">
        <v-icon>mdi-folder-table</v-icon>
        <span class="mx-2">
          Activity:
        </span>
        <span class="text-grey-darken-3">
          {{ activity?.title }}
        </span>
      </div>
      <v-divider class="my-4"></v-divider>
      <div class="d-flex justify-space-between px-4">
        <div>
          <nuxt-link :to="`/projects/${project?.id}`">
            <v-icon>mdi-folder-open</v-icon>
            <span class="mx-2">
              Project:
            </span>
            <span class="text-grey-darken-1">
              {{ project?.title }}
            </span>
          </nuxt-link>
        </div>
        <div>
          <DateView :date="activity?.starting_date" />
          <v-chip density="compact" class="font-weight-black mx-2 text-grey-darken-1 py-1">
            <v-icon class="mx-2">mdi-calendar-expand-horizontal</v-icon>

            {{ calcActivityTimeInDays(project?.starting_date, project?.end_date) }} Days
          </v-chip>
          <DateView :date="project?.end_date" />
        </div>
      </div>

    </div>
    <v-row class="align-center text-h6 my-8 mx-2 pa-1 border-lg border-blue rounded-lg bg-light-blue-lighten-5">
      <v-col>
        <v-icon class="mx-2">mdi-map-marker</v-icon>
        {{ activity?.place || 'N/A' }}
      </v-col>
      <v-divider vertical><v-icon color="grey">mdi-dots-vertical</v-icon></v-divider>
      <v-col class="text-end">
        <DateView :date="activity?.starting_date" />
        <v-chip size="large" density="compact" class="font-weight-black mx-2 text-grey-darken-1">
          <v-icon class="mx-2">mdi-calendar-expand-horizontal</v-icon>

          {{ calcActivityTimeInDays(activity?.starting_date, activity?.end_date) }} Days
        </v-chip>
        <DateView :date="activity?.end_date" />

      </v-col>
    </v-row>
  </div>
  <div class="my-6 border-lg rounded-lg mx-1 ">
    <div>
      <p class="py-4 font-weight-bold text-h6  bg-grey-lighten-4">
        <v-icon class="mx-4">mdi-file-document-outline</v-icon>
        Activity Details
      </p>
      <v-divider class="mb-8"></v-divider>
      <WHtmlView :html="activity?.description" />
    </div>

    <div>
      <p class="py-4 font-weight-bold text-h6  bg-grey-lighten-4">
        <v-icon class="mx-4">mdi-file-document-outline</v-icon>
        Partners
      </p>
      <v-divider class="mb-8"></v-divider>
      <WHtmlView :html="activity?.partners" />
    </div>

    <div>
      <p class="py-4 font-weight-bold text-h6  bg-grey-lighten-4">
        <v-icon class="mx-4">mdi-file-document-outline</v-icon>
        Participants
      </p>
      <div class="font-weight-bold ma-4">
        Number Of Participants: {{ activity?.audience_count }}
      </div>
      <v-divider class="mb-4"></v-divider>
      <WHtmlView :html="activity?.participants" />
    </div>

    <div>
      <p class="py-4 font-weight-bold text-h6  bg-grey-lighten-4">
        <v-icon class="mx-4">mdi-file-document-outline</v-icon>
        Challenges
      </p>
      <v-divider class="mb-8"></v-divider>
      <WHtmlView :html="activity?.challenges" />
    </div>
    
    <div>
      <p class="py-4 font-weight-bold text-h6  bg-grey-lighten-4">
        <v-icon class="mx-4">mdi-file-document-outline</v-icon>
        Challenges Overstep
      </p>
      <v-divider class="mb-8"></v-divider>
      <WHtmlView :html="activity?.how_challenges_faced" />
    </div>
    <div>
      <p class="py-4 font-weight-bold text-h6  bg-grey-lighten-4">
        <v-icon class="mx-4">mdi-file-document-outline</v-icon>
        Success Stories
      </p>
      <v-divider class="mb-8"></v-divider>
      <WHtmlView :html="activity?.success_stories" />
    </div>
    <div>
      <p class="py-4 font-weight-bold text-h6  bg-grey-lighten-4">
        <v-icon class="mx-4">mdi-file-document-outline</v-icon>
        Lessons
      </p>
      <v-divider class="mb-8"></v-divider>
      <WHtmlView :html="activity?.lessons" />
    </div>
    <div>
      <p class="py-4 font-weight-bold text-h6  bg-grey-lighten-4">
        <v-icon class="mx-4">mdi-file-document-outline</v-icon>
        Recommendations
      </p>
      <v-divider class="mb-8"></v-divider>
      <WHtmlView :html="activity?.recommendations" />
    </div>
  </div>

</template>

<script lang="ts" setup>
import moment from "moment";
const props = defineProps(['activity'])

function calcActivityTimeInDays(dateOne: string | Date, dateTwo: string | Date) {
  const diffInDays = Math.abs(moment(dateOne).diff(dateTwo, 'days'));
  if (isNaN(diffInDays)) return 'N/A';
  return diffInDays + 1;
}

const project = computed(() => props.activity?.expand?.project);
</script>

<style></style>