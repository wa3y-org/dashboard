<template>
  <w-html-view-dialog title="Job Description" :html="employee?.job_description"
    :show="jobDescriptionModal.isShown.value" @close="jobDescriptionModal.hide" />
  <div class="my-8">
    <v-row>
      <v-col class="px-4">
        <div class="d-flex ">
          <div>
            <v-avatar size="184" class="elevation-4" rounded="xl">
              <v-img contain :src="avatarImage" alt="alt" />
            </v-avatar>

          </div>
          <span class="mx-2"></span>
          <div class="d-inline-block ma-4">
            <span class="font-weight-black text-nowrap">{{ employee?.name }}</span>
            <p class="text-grey-darken-2"> {{ employee?.email }}</p>
            <p class="mt-2 text-blue">
              {{ employee?.id }}
            </p>
            <p class="mt-2">
              <v-chip density="compact" color="primary" class="px-4" label>
                {{ employee?.sex }} ({{ calcAge(employee?.birth_date?.toString() || '') }})
              </v-chip>
            </p>

            <div class="mt-6">
              <v-chip density="compact" variant="outlined" size="large" class="font-weight-bold"
                :color="employee ? getStatusColor(employee) : ''">{{
                  employee?.employment_status
                }}</v-chip>

            </div>

          </div>
        </div>
      </v-col>
      <v-col cols="3">
        <div class="text-center" v-if="employee?.project">

          <v-chip :to="`/projects/${employee?.project}`" size="large" class="px-4 border-lg border-lg" color="primary">
            <div>
              Project : {{ employee?.expand.project.title }}
            </div>
          </v-chip>
        </div>
        <div class="font-weight-bold my-4 border-lg border-primary elevation-2 pa-2 rounded-lg">
          {{ employee?.employment_type }}
          <v-divider class="my-1"></v-divider>
          <div class="d-flex justify-space-between align-center">
            {{ employee?.employment_position }}
            <v-btn color="primary" size="small" variant="text" icon="mdi-file-document-outline"
              @click="jobDescriptionModal.show" />
          </div>
          <v-divider class="my-2"></v-divider>
          {{ employee?.employment_section }}
          <v-divider class="my-2"></v-divider>
          {{ employee?.shift }}

        </div>

        <div class="my-3 font-weight-bold">
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
      <v-col class="font-weight-black px-4">

        <div class="">
          <p class="my-6">Address: {{ employee?.address }}</p>
        </div>
        <div class="my-4"></div>

        <div>
          <span class="border pa-2 rounded-lg font-weight-bold">
            {{ employee?.marital_status }} |
            {{ employee?.number_of_children }} children
          </span>
        </div>
      </v-col>

      <v-col cols="3">
        <div class="my-3 d-flex font-weight-bold">
          Phones:
          <div>
            <div v-for="phone of employee?.phone_numbers">
              <v-chip class="mx-2 mb-2" label density="compact">{{ phone }}</v-chip>
            </div>
          </div>
        </div>

      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col>
        <EmployeesEmployeeSalaryInfo :employee="employee" />
      </v-col>
    </v-row> -->
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

const jobDescriptionModal = useModal();

</script>

<style></style>