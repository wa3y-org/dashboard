<template>
  <div>

    <v-data-table :loading="volunteersFetcher.loading.isLoading.value" :headers="headers"
      :items="volunteersFetcher.volunteersList.value">
      <template v-slot:item.avatar="{ item }">
        <NuxtLink :to="`/hr/volunteers/${item.id}`">
          <div class="d-flex align-center">
            <v-avatar cover size="84" rounded="lg" class="my-2 elevation-1">

              <v-img :src="getAvatarUrl(item)" alt="volunteer avatar image" />

            </v-avatar>
            <div class="d-inline-block mx-4">
              <span class="font-weight-bold text-nowrap">{{ item.name }}</span>
              <p class="text-grey-darken-2"> {{ item.email }}</p>
              <p class="mt-2">
                <v-chip density="compact" color="primary" class="px-4" label>
                  {{ item.sex }} ({{ calcAge(item.birth_date?.toString() || '') }})
                </v-chip>
              </p>
            </div>
          </div>
        </NuxtLink>
      </template>
      <template v-slot:item.starting_date="{ item }">
        <date-view :date="item.starting_date" />
        ({{ calcAge(item.starting_date) }})
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip size="large" class="font-weight-bold" :color="getStatusColor(item)">{{ item.membership_status }}</v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import type { VolunteersRecord } from "~/app/pocketbase-types";
import moment from "moment";
const volunteersFetcher = useVolunteers();

onMounted(() => {
  volunteersFetcher.loadVolunteers();
})

const headers = [
  { title: 'volunteer', key: 'avatar', },
  { title: 'Joining Date', key: 'starting_date', },
  { title: 'status', key: 'status', align: 'end' },
];

function calcAge(birthDate: string) {
  return moment(birthDate).fromNow(true)
}

function getStatusColor(volunteer: VolunteersRecord) {
  let color = '';
  switch (volunteer.membership_status) {
    case "Active":
      color = 'success'
      break;
    case "Suspended":
      color = 'error'
      break;
    case "Resigned":
      color = 'black';
      break;
  }
  return color;
};


function getAvatarUrl(volunteer: VolunteersRecord) {
  return usePocketBase().files.getUrl(volunteer, volunteer.avatar || '');
}
</script>

<style></style>