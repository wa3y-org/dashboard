<template>
  <v-dialog v-model="showDataModal.isShown.value" :max-width="showBefore && showAfter ? 1280 : 1080" scrollable>
    <v-card rounded="xl">
      <v-toolbar>
        <v-toolbar-title>
          Data View
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" color="error" class="mx-2" @click="showDataModal.hide"></v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col v-if="showBefore">
            <div class="font-weight-bold">Old Value</div>
            <vue-json-pretty :data="activity?.obj_before" class="border-md pa-2 rounded-lg my-2" />
          </v-col>
          <v-divider v-if="showBefore && showAfter" vertical></v-divider>
          <v-col v-if="showAfter">
            <div class="font-weight-bold">New Value</div>
            <vue-json-pretty :data="activity?.obj_after" class="border-md pa-2 rounded-lg my-2" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-card color="" flat :border="`sm ${activityColor}`" rounded="0" class="pl-2" @click="showDataModal.show">
    <v-row>
      <v-col cols="4" md="5" sm="6" xs="12" xl="3" lg="4">
        <w-employee-card :employee="activity?.expand?.employee" />
      </v-col>
      <v-divider vertical></v-divider>
      <v-col>

        <div class="d-flex flex-column h-100">
          <p class="text-black text-start my-2">
            {{ calcAge(activity.created.toString()) }}
            [
            <DateView :show-time="true" :date="activity.created" /> ]
          <pre>--------------------------</pre>
          </p>
          <div>
            <v-chip class="ma-1 px-3" size="small" v-for="category of activity?.categories"
              :key="activity?.id + category">
              {{ category }}
            </v-chip>
          </div>
        </div>
      </v-col>
      <v-col class="text-end">

        <div>
          <v-chip class="rounded-xl pt-10 pb-6 pr-8 pl-6" size="x-large"
            style="position: absolute; top: -20px; right: -20px;" :prepend-icon="getActionIcon(activity.action)" label
            :color="activityColor">
            {{
              activity.action.toLocaleLowerCase()
            }} - {{ collectionName }}
          </v-chip>

        </div>
        <div class="text-start">

          <div class="text-start" v-html="activity.comment" />
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import moment from 'moment';
import { UserActivitiesActionOptions } from '~/app/pocketbase-types';

const props = defineProps({
  activity: {
    type: Object,
    required: true,
  }
})

const showDataModal = useModal();

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

function calcAge(birthDate: string) {
  return moment(birthDate).fromNow(true)
}

const showBefore = computed(() => {
  if (props.activity?.action == UserActivitiesActionOptions.CREATE) return false;
  return true;
});

const showAfter = computed(() => {
  if (props.activity?.action == UserActivitiesActionOptions.DELETE) return false;
  return true;
});

const collectionName = computed(() => {
  if (props.activity?.obj_after?.collectionName) return props.activity.obj_after.collectionName;
  if (props.activity?.obj_before?.collectionName) return props.activity.obj_before.collectionName;

  return '--unknown--'
});
</script>