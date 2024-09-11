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
            <span class="font-weight-black text-nowrap">{{ member?.name }}</span>
            <p class="text-grey-darken-2"> {{ member?.email }}</p>
            <p class="mt-2">
              <v-chip density="compact" color="primary" class="px-4" label>
                {{ member?.sex }} ({{ calcAge(member?.birth_date?.toString() || '') }})
              </v-chip>
            </p>
            <div class="mt-4">
              <v-chip density="compact" variant="outlined" size="large" class="font-weight-bold"
                :color="member ? getStatusColor(member) : ''">{{
                  member?.membership_status
                }}</v-chip>

            </div>

          </div>
        </div>
      </v-col>
      <v-divider vertical class="mx-4"></v-divider>
      <v-col class="font-weight-bold px-4">

        <div class="d-flex justify-space-between align-center">
          <p class="my-6">Address: {{ member?.address }}</p>


        </div>
        <v-divider></v-divider>
        <div class="my-3 d-flex">
          Phones:
          <div>
            <div v-for="phone of member?.phone_numbers">
              <v-chip class="mx-2 mb-2" label density="compact">{{ phone }}</v-chip>

            </div>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="my-3">

          <p class="my-3">
            Started At: {{ moment(member?.starting_date).format('DD-MM-YYYY') }} ({{ calcAge(member?.starting_date)
            }})
          </p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import type { MembersRecord } from "~/app/pocketbase-types";
import moment from "moment";


const props = defineProps(['member'])

const avatarImage = computed(() => {
  if (props.member?.avatar) {
    return usePocketBase().files.getUrl(props.member, props.member?.avatar)
  }
  return 'unknown';
});

function calcAge(birthDate: string) {
  return moment(birthDate).fromNow(true)
}

function getStatusColor(member: MembersRecord) {
  let color = '';
  switch (member.membership_status) {
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