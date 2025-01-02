<template>
  <div class="pa-4">
    <div style="height: 24cm;">
      <p class="text-h3 font-weight-bold text-center">
        Wa3y Project Report
      </p>
      <p class="my-4 font-weight-bold  text-center">
        Date:
        <DateView :date="new Date()" />
      </p>
      <div class="text-h6 font-weight-bold px-8 mt-16 pt-16">
        <p class="text-h4 font-weight-bold">
          Project Title: {{ project?.title }}
        </p>
        <p>
          Place: {{ project?.place }}
        </p>
        <p>
          Starts At:
          <DateView :date="project?.starting_date" />
        </p>
        <p>
          Ends At:
          <DateView :date="project?.end_date" />
        </p>
        <p>
          Duration: {{ calcProjectTimeInDays() }} Days
        </p>
      </div>
    </div>


    <div class="my-4" style="min-height: 24cm;">
      <div>
        <p class="py-4 font-weight-bold text-h6 ">
          <v-icon class="mx-1">mdi-menu-right</v-icon>
          About Project
        </p>
        <div class="mb-2"></div>
        <WHtmlView class="mx-8" :html="project?.details || ''" />
      </div>
      <TiptapHardBreak />
      <div>
        <p class="py-4 font-weight-bold text-h6 ">
          <v-icon class="mx-1">mdi-menu-right</v-icon>
          Objectives
        </p>
        <div class="mb-2"></div>
        <WHtmlView class="mx-8" :html="project?.objectives || ''" />
      </div>
      <div>
        <p class="py-4 font-weight-bold text-h6 ">
          <v-icon class="mx-1">mdi-menu-right</v-icon>
          Targeted Groups
        </p>
        <div class="mb-2"></div>
        <WHtmlView class="mx-8" :html="project?.targeted_groups || ''" />
      </div>
      <div>
        <p class="py-4 font-weight-bold text-h6 ">
          <v-icon class="mx-1">mdi-menu-right</v-icon>
          Context-Dependant Topics
        </p>
        <div class="mb-2"></div>
        <WHtmlView class="mx-8" :html="project?.context_dependant_topics || ''" />
      </div>
    </div>
    <TiptapHardBreak />
    <div class="my-4" style="min-height: 24cm;">
      <p class="py-4 text-center">
        <hr class="my-4" />
      <p class="font-weight-bold text-h4">
        Project Activities
      </p>
      <hr class="my-4" />
      </p>
      <div class="font-weight-bold text-h5">
        This Project Have {{ activitiesList.length || '0' }} Activities
      </div>
      <div class="font-weight-bold text-h6">
        <ol class="mx-16 pt-4">
          <li class="my-2" v-for="(activity, index) of activitiesList" :key="activity.id">
            {{ activity.title }}
          </li>
        </ol>
      </div>
      <div>
        <div class="my-4" v-for="(activity, index) of activitiesList" :key="activity.id">
          <p class="py-4 font-weight-bold text-h6 ">
            <hr class="my-2" />
            <!-- <v-icon class="mx-1">mdi-menu-right</v-icon> -->
            {{ index + 1 }}. {{ activity.title }}
            <hr class="my-2" />

          </p>
          <div class="ml-8">
            <div class="font-weight-bold">
              <p>
                Place: {{ activity?.place }}
              </p>
              <p>
                Starts At:
                <DateView :date="activity?.starting_date" />
              </p>
              <p>
                Ends At:
                <DateView :date="activity?.end_date" />
              </p>
              <p>
                Number of Participants:
                {{ activity?.audience_count }}
              </p>
            </div>
          </div>
          <div class="my-2"></div>
          <div>
            <p class="py-4 font-weight-bold text-h6 ">
              <v-icon class="mx-1">mdi-menu-right</v-icon>
              About Activity
            </p>
            <div class="mb-2"></div>
            <WHtmlView class="mx-8"  :html="activity?.description || ''" />
          </div>
          <div>
            <p class="py-4 font-weight-bold text-h6 ">
              <v-icon class="mx-1">mdi-menu-right</v-icon>
              Challenges
            </p>
            <div class="mb-2"></div>
            <WHtmlView class="mx-8" :html="activity?.challenges || ''" />
          </div>
          <div>
            <p class="py-4 font-weight-bold text-h6 ">
              <v-icon class="mx-1">mdi-menu-right</v-icon>
              Challenges Overstep
            </p>
            <div class="mb-2"></div>
            <WHtmlView class="mx-8" :html="activity?.how_challenges_faced || ''" />
          </div>
          <div>
            <p class="py-4 font-weight-bold text-h6 ">
              <v-icon class="mx-1">mdi-menu-right</v-icon>
              Success Stories
            </p>
            <div class="mb-2"></div>
            <WHtmlView class="mx-8" :html="activity?.success_stories || ''" />
          </div>
          <div>
            <p class="py-4 font-weight-bold text-h6 ">
              <v-icon class="mx-1">mdi-menu-right</v-icon>
              Partners
            </p>
            <div class="mb-2"></div>
            <WHtmlView class="mx-8" :html="activity?.partners || ''" />
          </div>
          <div>
            <p class="py-4 font-weight-bold text-h6 ">
              <v-icon class="mx-1">mdi-menu-right</v-icon>
              Lessons
            </p>
            <div class="mb-2"></div>
            <WHtmlView class="mx-8" :html="activity?.lessons || ''" />
          </div>
          <div>
            <p class="py-4 font-weight-bold text-h6 ">
              <v-icon class="mx-1">mdi-menu-right</v-icon>
              Recommendations
            </p>
            <div class="mb-2"></div>
            <WHtmlView class="mx-8" :html="activity?.recommendations || ''" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment';
import type { ProjectsActivitiesRecord, ProjectsActivitiesResponse } from '~/app/pocketbase-types';
import type { TProject } from '~/composables/projects/index';

definePageMeta({
  layout: 'blank'
})

const project: Ref<TProject | null> = ref(null)

const projectId = useRoute().params.id;
const loading = useLoading();
const backendError = useBackendError();
async function loadProject() {
  loading.start();
  const response = await useProjects().getOne(projectId.toString())
  loading.end();

  if (response.error) {
    backendError.set(response.error)
    return;
  }

  if (response.model) {
    project.value = response.model;
  }
}

function calcProjectTimeInDays() {
  const diffInDays = Math.abs(moment(project.value?.starting_date).diff(project.value?.end_date, 'days'));
  if (isNaN(diffInDays)) return 'N/A';
  return diffInDays + 1;
}

onMounted(async () => {
  await loadProject();
  await loadActivities();
  window.setTimeout(window.print, 1500);
});

const activitiesList: Ref<(ProjectsActivitiesRecord | ProjectsActivitiesResponse)[]> = ref([])


async function loadActivities() {
  loading.start();
  const response = await useActivities().getAll(project.value?.id || '', "*");
  loading.end();

  if (response.models) {
    activitiesList.value = response.models;
  }
}


</script>