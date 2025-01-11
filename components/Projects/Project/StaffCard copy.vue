<template>
  <LoadingFromBackend v-if="loadingStaffMember.isLoading.value" class="ma-4" />
  <div v-else-if="staffMember.person">
    <v-list-item :to="getPersonRoute(staffMember)">
      <div class="d-flex align-center">
        <v-avatar cover size="64" rounded="lg" class="ma-2 elevation-1">
          <v-img :src="getAvatarUrl(staffMember.person)" alt="employee avatar image" />

        </v-avatar>
        <div class="d-inline-block mx-4">
          <span class="font-weight-bold text-nowrap">{{ staffMember.person?.name }}</span>
          <p class="text-grey-darken-2"> {{ staffMember.person?.email }}</p>

          <div>
            <v-chip density="compact" variant="outlined" size="small" class="my-1 mx-auto font-weight-bold"
              :color="getStatusColor(staffMember.person)">
              {{ getStatus(staffMember.person) }}
            </v-chip>
          </div>
        </div>
        <v-spacer></v-spacer>
        <v-chip class="font-weight-bold" size="large" density="compact" :color="getStaffTypeColor(staffMember.type)">{{
          staffMember.type
        }}</v-chip>
      </div>
    </v-list-item>
  </div>
  <div v-else>
    <v-alert type="error" variant="text">
      Something went wrong - try refresh
    </v-alert>
  </div>
</template>

<script lang="ts" setup>
import { type StaffPerson, type TStaff } from "~/composables/staff/index";

const props = defineProps(['staffMember'])

function getStaffTypeColor(type: 'member' | 'employee') {
  switch (type) {
    case 'employee':
      return 'primary'
    case 'member':
      return 'secondary'
    default:
      return ''
  }
}

const loadingStaffMember = useLoading();
async function loadStaffMemberData() {
  loadingStaffMember.start();
  if (props.staffMember.type == 'employee') {
    props.staffMember.person = await useEmployees().loadOneEmployee(props.staffMember.person_id)
  }
  else if (props.staffMember.type == 'member') {
    props.staffMember.person = await useMembers().loadOneMember(props.staffMember.person_id)
  }
  loadingStaffMember.end();
}

function getStatus(person: StaffPerson) {
  if (!person) return '';
  const status = person.employment_status || person.membership_status || ''
  return status;
}

function getStatusColor(person: StaffPerson) {
  let color = '';
  const status = getStatus(person)
  switch (status) {
    case "Active":
      color = 'success'
      break;
    case "Suspended":
      color = 'error'
      break;
    case "Resigned":
      color = 'black';
      break;
    case "In_Vacation":
      color = "warning";
      break;
  }
  return color;
};


function getAvatarUrl(person: StaffPerson) {
  return usePocketBase().files.getUrl(person, person.avatar || '');
}

function getPersonRoute(staff: TStaff) {
  if (!staff.person) return '';
  if (staff.type == 'employee') {
    return `/hr/employees/${staff.person.id}`
  }
  if (staff.type == 'member') {
    return `/hr/members/${staff.person.id}`
  }
}

onMounted(loadStaffMemberData);
</script>

<style></style>