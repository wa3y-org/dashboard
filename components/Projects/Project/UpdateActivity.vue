<template>
  <v-dialog :model-value="show" scrollable persistent :overlay="false" max-width="1080px"
    transition="dialog-transition">
    <v-card rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar color="transparent">
        <v-toolbar-title class="font-weight-black">
          <v-icon>mdi-folder-table-outline</v-icon>
          <span class="mx-1"></span>
          Update activity
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="cancel" />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col>
            <text-field :errors="validationErrors.title" v-model="activityData.title" name="Title"
              placeholder="Enter Activity Title" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-field :errors="validationErrors.place" v-model="activityData.place" name="place"
              placeholder="Enter Activity Place" />
          </v-col>
          <v-col>
            <NumberField :errors="validationErrors.audience_count" v-model="activityData.audience_count" name="Audience"
              placeholder="Enter Number of Participants" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <date-picker v-model="activityData.starting_date" name="Starting At" />
          </v-col>
          <v-col>
            <date-picker v-model="activityData.end_date" name="Ends At" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor v-model="activityData.description" name="Detailed Description"
              placeholder="Write Details Description Here" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor v-model="activityData.participants" name="Participants"
              placeholder="Write about participants" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor v-model="activityData.partners" name="Partners" placeholder="Write Details About Partners" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor v-model="activityData.challenges" name="Challenges" placeholder="Write Challenges Here" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor v-model="activityData.how_challenges_faced" name="Challenges Overstep"
              placeholder="How did you face issues and challenges" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor v-model="activityData.success_stories" name="Success Stories"
              placeholder="Write Success Stories Here" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor v-model="activityData.lessons" name="Lessons" placeholder="Write Lessons Here" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor v-model="activityData.recommendations" name="Recommendations"
              placeholder="Write Recommendations Here" />
          </v-col>
        </v-row>
      </v-card-text>
      <div v-if="backendError.error && backendError.hasError" class="my-4">
        <v-divider class="my-4"></v-divider>
        <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error"
          v-if="backendError.hasError" />
      </div>
      <v-divider></v-divider>
      <v-card-actions class="pa-4">
        <v-alert type="error" :value="true" variant="text" v-if="Errors.hasError(validationErrors)">
          Input Validation Error
        </v-alert>
        <v-spacer></v-spacer>
        <save-cancel-btn :loading="loading.isLoading.value" @cancel="cancel" @save="save" />
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script lang="ts" setup>
import type { ProjectsActivitiesRecord, ProjectsActivitiesResponse } from "~/app/pocketbase-types";
const emit = defineEmits(['cancel', 'saved']);

const props = defineProps(['show', 'activity'])

function cancel() {
  emit('cancel')
}

const Activities = useActivities();

const isFirstAttempt = ref(true);
const validationErrors = computed(() => {
  if (isFirstAttempt.value) return {};
  return Activities.validate(activityData.value)
});

const Errors = useErrors();
const backendError = useBackendError();

const loading = useLoading();
async function save() {
  isFirstAttempt.value = false;

  backendError.clear();
  if (Errors.hasError(validationErrors.value)) {
    return;
  }

  loading.start();
  const response = await Activities.update(activityData.value)
  loading.end();

  if (response.error) {
    backendError.set(response.error)
    return
  }

  emit('saved');


}

const activityData: Ref<ProjectsActivitiesRecord | ProjectsActivitiesResponse> = ref({
  title: '',
  partners: '',
  success_stories: '',
  lessons: '',
  challenges: '',
  recommendations: '',
  project: props.activity?.project || '',
  place: '',
  starting_date: '',
  end_date: '',
  description: '',
  audience_count: null,
  how_challenges_faced: null,
  participants: null,
})

const activityId = computed(() => {
  return props.activity?.id || ''
});

async function loadActivity() {
  loading.start();
  const response = await useActivities().getOne(activityId.value.toString());
  loading.end();

  if (response.model) {
    activityData.value = response.model
  }
}

watch(() => props.show, () => {
  if (props.show) {
    loadActivity();
  }
}, { deep: true });
onMounted(() => {
  loadActivity();
});


</script>

<style></style>