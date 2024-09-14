<template>
  <v-autocomplete :loading="loading.isLoading.value" :error-messages="errors" :multiple="false" v-model="model" item-value="id" chips v-bind="props.props"
    return-object hide-selected auto-select-first clearable open-on-clear hide-details="auto" rounded="lg"
    variant="outlined" :items="visibleEmployees" class="font-weight-bold" :placeholder="placeholder"
    :custom-filter="filterByNameAndEmail">
    <template v-slot:prepend-inner>
      <div class="mx-2 text-primary text-no-wrap">
        <v-icon v-if="icon">{{ icon }}</v-icon>
        Select Employee :
      </div>
    </template>
    <template v-slot:chip="{ props, item }">
      <v-chip size="large" v-bind="props" class="font-weight-bold bg-white pa-0">
        <v-avatar :image="getAvatarUrl(item.raw)" size="40" class="ma-0 pa-0">
        </v-avatar>
        <span class="mx-3">
          {{ item.raw.name }}
        </span>
        <span class="mx-2"></span>
      </v-chip>
    </template>
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" title="" :disabled="item.raw.employment_status != 'Active'">
        <div class="d-flex align-center">
          <v-avatar cover size="64" rounded="lg" class="ma-2 elevation-1">
            <v-img :src="getAvatarUrl(item.raw)" alt="employee avatar image" />

          </v-avatar>
          <div class="d-inline-block mx-4">
            <span class="font-weight-bold text-nowrap">{{ item.raw.name }}</span>
            <p class="text-grey-darken-2"> {{ item.raw.email }}</p>

          </div>
          <v-spacer></v-spacer>
          <v-chip size="large" class="font-weight-bold" :color="getStatusColor(item.raw)">
            {{ item.raw.employment_status }}
          </v-chip>

        </div>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script lang="ts" setup>
import type { EmployeesResponse, EmployeesRecord } from "~/app/pocketbase-types";
import moment from "moment";


const model = defineModel()
const props = defineProps(['errors', 'placeholder', 'name', 'icon', 'props', 'items', 'hidden'])

type TEmployee = EmployeesRecord | EmployeesResponse;

const employeesFetcher = useEmployees();
const { employeesList, loading } = employeesFetcher;
onMounted(() => {
  employeesFetcher.loadEmployees();
})

function isHidden(employee: TEmployee) {
  if (employee.employment_status != 'Active') return true;

  for (let hiddenEmployee of props.hidden || []) {
    if (employee.id == hiddenEmployee.id) {
      return true;
    }
  }
  return false;
}

const visibleEmployees = computed<TEmployee[]>(() => {
  let visible = [];
  for (let employee of employeesList.value) {
    if (!isHidden(employee)) {
      visible.push(employee)
    }
  }

  return visible;
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


function getAvatarUrl(employee: EmployeesRecord) {
  return usePocketBase().files.getUrl(employee, employee.avatar || '');
}


function filterByNameAndEmail(itemTitle: string, queryText: string, item: any) {
  const textOne = item.raw.name.toLowerCase()
  const textTwo = item.raw.email.toLowerCase()
  const searchText = queryText.toLowerCase()
  return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
}
</script>

<style></style>