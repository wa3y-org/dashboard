<template>
  <div>
    <!-- <v-text-field prepend-inner-icon="mdi-magnify" placeholder="Search | Filter" v-model="search" /> -->
     <div class="rounded-xl overflow-hidden border-md">
       <ActivitiesMonitorCard class="my-2" :activity="activity" v-for="activity of usersActions" :key="activity.id" />
     </div>

    <div class="my-6 text-center">
      <v-btn v-if="!isAllItemsLoaded" prepend-icon="mdi-download" :loading="loading.isLoading.value" size="large"
        color="primary" rounded="pill" @click="loadUsersActivities">

        {{ `Load More ${pagination.perPage} records` }}

      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserActivitiesActionOptions } from '~/app/pocketbase-types';
import { type TUserActivity } from '~/composables/activityMonitor/index';

const headers = [
  { key: 'employee', title: 'Employee' },
  { key: 'action', title: 'Action' },
  { key: 'comment', title: 'Note' },
  { key: 'categories', title: 'Categories', align: 'end' },
  { key: 'actions', title: 'Actions', align: 'end' },
]

const search = ref('')

const usersActions = ref<TUserActivity[]>([])

const pagination = ref({
  page: 0,
  perPage: 5,
  totalItems: 5,
  totalPages: 1
})

const isAllItemsLoaded = computed(() => {
    return pagination.value.page >= pagination.value.totalPages
});


const loading = useLoading();
const backendError = useBackendError();
async function loadUsersActivities() {
  loading.start();
  const response = await useActivityMonitor().get.paginated(pagination.value.page + 1);
  loading.end();

  if (response.error) {
    backendError.set(response.error);
    return;
  }

  if (response.models) {
    pagination.value = {
      page: response.models.page,
      perPage: response.models.perPage,
      totalItems: response.models.totalItems,
      totalPages: response.models.totalPages
    };
    usersActions.value = usersActions.value.concat(response.models.items);
  }
}



function getActionColor(color: UserActivitiesActionOptions) {
  switch (color) {
    case UserActivitiesActionOptions.CREATE:
      return 'primary';
    case UserActivitiesActionOptions.UPDATE:
      return 'info'
    case UserActivitiesActionOptions.DELETE:
      return 'error'
    default:
      return 'black';
  }
}

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

onMounted(async () => {
  await loadUsersActivities();
  usePocketBase().collection('user_activities').subscribe('*', function (e) {
    usersActions.value.unshift(e.record);
  }, {
    expand: "employee",
    sort: "-created",
  });
})

onUnmounted(() => {
  usePocketBase().collection('user_activities').unsubscribe('*');
});
</script>