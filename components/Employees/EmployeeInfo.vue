<template>
  <div class="my-8">
    <v-row>
      <v-col class="px-4">
        <div class="d-flex align-center">
          <div>
            <v-avatar size="184" class="elevation-4" rounded="xl">
              <v-img contain :src="avatarImage" alt="alt" />
            </v-avatar>
            <div class="text-center mt-4">
              <v-chip density="compact" variant="outlined" size="large" class="font-weight-bold"
                :color="employee ? getStatusColor(employee) : ''">{{
                  employee?.employment_status
                }}</v-chip>

            </div>
          </div>
          <span class="mx-2"></span>
          <div class="d-inline-block ma-4">
            <span class="font-weight-black text-nowrap">{{ employee?.name }}</span>
            <p class="text-grey-darken-2"> {{ employee?.email }}</p>
            <p class="mt-2">
              <v-chip density="compact" color="primary" class="px-4" label>
                {{ employee?.sex }} ({{ calcAge(employee?.birth_date?.toString() || '') }})
              </v-chip>
            </p>
            <div class="font-weight-bold my-4 border-lg pa-2 rounded-lg">
              {{ employee?.employment_position }}
              <v-divider class="my-2"></v-divider>
              ({{ employee?.employment_section }})
            </div>

          </div>
        </div>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col class="font-weight-bold px-4">

        <div class="d-flex justify-space-between align-center">
          <p class="my-6">Address: {{ employee?.address }}</p>
          <div>
            <span class="border pa-2 rounded-lg font-weight-bold">
              {{ employee?.marital_status }} |
              {{ employee?.number_of_children }} children
            </span>
          </div>

        </div>
        <v-divider></v-divider>
        <div class="my-3 d-flex">
          Phones:
          <div>
            <div v-for="phone of employee?.phone_numbers">
              <v-chip class="mx-2 mb-2" label density="compact">{{ phone }}</v-chip>

            </div>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="my-3">
          <p>
            Qualification: {{ employee?.qualification }} - ({{ employee?.specialization }})
          </p>
          <p class="my-3">
            Started At: {{ moment(employee?.starting_date).format('DD-MM-YYYY') }} ({{ calcAge(employee?.starting_date)
            }})
          </p>
        </div>
      </v-col>
    </v-row>
    <v-divider class="my-8"></v-divider>
    <v-row>
      <v-col>
        <EmployeesEmployeeSalaryInfo :employee="employee" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import type { EmployeesRecord } from "~/app/pocketbase-types";
import moment from "moment";


const props = defineProps(['employee'])

const avatarImage = computed(() => {
  if (props.employee?.avatar) {
    return usePocketBase().files.getUrl(props.employee, props.employee?.avatar)
  }
  return 'unknown';
});

function calcAge(birthDate: string) {
  return moment(birthDate).fromNow(true)
}

function getStatusColor(employee: EmployeesRecord) {
  let color = '';
  switch (employee.employment_status) {
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

</script>

<style></style>