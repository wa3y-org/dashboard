<template>
  <v-card :border="`lg ${activityColor}`" rounded="lg" class="pl-2">
    <v-row>
      <v-col cols="4" md="5" sm="6" xs="12" xl="3" lg="4">
        <w-employee-card :employee="activity?.expand?.employee" />
      </v-col>
      <v-divider vertical></v-divider>
      <v-col>
        <div class="d-flex align-center h-100">
          <div>
            <v-chip class="ma-1 px-3" size="small" v-for="category of activity?.categories"
              :key="activity?.id + category">
              {{ category }}
            </v-chip>
          </div>
        </div>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col class="text-end">
        <v-chip class="rounded-xl pt-10 pb-6 pr-8 pl-6" size="x-large"
        style="position: relative; top: -20px; right: -20px;" :prepend-icon="getActionIcon(activity.action)" label
        :color="activityColor"> {{
          activity.action.toLocaleLowerCase()
        }}</v-chip>
        <div class="text-start" v-html="activity.comment" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { UserActivitiesActionOptions } from '~/app/pocketbase-types';

const props = defineProps({
  activity: {
    type: Object,
    required: true,
  }
})


const activityColor = computed<string>(() => {
  switch (props.activity?.action) {
    case UserActivitiesActionOptions.CREATE:
      return 'primary';
    case UserActivitiesActionOptions.UPDATE:
      return 'info'
    case UserActivitiesActionOptions.DELETE:
      return 'error'
    default:
      return 'black';
  }
});

function getActionIcon(color: UserActivitiesActionOptions) {
  switch (color) {
    case UserActivitiesActionOptions.CREATE:
      return 'mdi-plus-thick';
    case UserActivitiesActionOptions.UPDATE:
      return 'mdi-pencil'
    case UserActivitiesActionOptions.DELETE:
      return 'mdi-delete'
    default:
      return 'black';
  }
}
</script>