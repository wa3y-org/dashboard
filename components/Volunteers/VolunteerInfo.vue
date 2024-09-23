<template>
  <div class="my-8">
    <v-row>
      <v-col class="px-4">
        <div class="d-flex ">
          <div>
            <v-avatar size="184" class="elevation-4" rounded="circle">
              <v-img contain :src="avatarImage" alt="alt" />
            </v-avatar>
            
          </div>
          <span class="mx-2"></span>
          <div class="d-inline-block ma-4">
            <span class="font-weight-black text-nowrap">{{ volunteer?.name }}</span>
            <p class="text-grey-darken-2"> {{ volunteer?.email }}</p>
            <p class="mt-2">
              <v-chip density="compact" color="primary" class="px-4" label>
                {{ volunteer?.sex }} ({{ calcAge(volunteer?.birth_date?.toString() || '') }})
              </v-chip>
            </p>
            <div class="mt-4">
              <v-chip density="compact" variant="outlined" size="large" class="font-weight-bold"
                :color="volunteer ? getStatusColor(volunteer) : ''">{{
                  volunteer?.membership_status
                }}</v-chip>

            </div>

          </div>
        </div>
      </v-col>
      <v-divider vertical class="mx-4"></v-divider>
      <v-col class="font-weight-bold px-4">

        <div class="d-flex justify-space-between align-center">
          <p class="my-6">Address: {{ volunteer?.address }}</p>


        </div>
        <v-divider></v-divider>
        <div class="my-3 d-flex">
          Phones:
          <div>
            <div v-for="phone of volunteer?.phone_numbers">
              <v-chip class="mx-2 mb-2" label density="compact">{{ phone }}</v-chip>

            </div>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="my-3">

          <p class="my-3">
            Started At: {{ moment(volunteer?.starting_date).format('DD-MM-YYYY') }} ({{ calcAge(volunteer?.starting_date)
            }})
          </p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import type { VolunteersRecord } from "~/app/pocketbase-types";
import moment from "moment";


const props = defineProps(['volunteer'])

const avatarImage = computed(() => {
  if (props.volunteer?.avatar) {
    return usePocketBase().files.getUrl(props.volunteer, props.volunteer?.avatar)
  }
  return 'unknown';
});

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

</script>

<style></style>