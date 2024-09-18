<template>
  <v-card rounded="lg" class="my-4">
    <v-toolbar color="transparent">
      <v-toolbar-title class="font-weight-bold">
        <v-icon>mdi-cash-multiple mdi-rotate-225</v-icon>
        <span class="mx-2"></span>
        Payroll History
      </v-toolbar-title>

    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <div class="d-flex justify-center">
        <div class="text-center">

          <MonthPicker class="rounded-lg overflow-auto border" :default-month="defaultMonth" :default-year="defaultYear"
            @change="setPayrollDate" />
          <v-btn :loading="loading.isLoading.value" class="mt-4" @click="loadPayments" color="primary"
            prepend-icon="mdi-magnify">Search</v-btn>
        </div>
      </div>
      <v-divider class="mb-2 mt-8"></v-divider>
      <v-data-table :headers="headers" :items="payments" item-key="id" :loading="loading.isLoading.value">
        <template v-slot:item.employee="{ item }">
          <NuxtLink :to="`/hr/employees/${item.expand.employee.id}`">
            <div class="d-flex ">

              <v-avatar cover size="84" rounded="lg" class="my-2 elevation-1">
                <v-img :src="getAvatarUrl(item.expand.employee)" alt="employee avatar image" />
              </v-avatar>
              <div class="mx-1"></div>
              <div class="d-inline-block mx-4 mt-2">
                <span class="font-weight-bold text-nowrap">{{ item.expand.employee.name }}</span>
                <p class="text-grey-darken-2"> {{ item.expand.employee.email }}</p>
                <v-divider class="mt-2"></v-divider>
                <div class="d-flex align-center">

                  <span class="font-weight-bold">
                    {{ item.expand.employee.employment_position }} in ({{ item.expand.employee.employment_section }})
                  </span>
                  <v-chip density="compact" variant="outlined" class="ma-2 font-weight-bold"
                    :color="getStatusColor(item.expand.employee)">{{
                      item.expand.employee.employment_status }}</v-chip>
                </div>

              </div>
            </div>
          </NuxtLink>

        </template>
        <template v-slot:item.total_salary="{ item }">
          <w-usd color="primary" :amount="item.total_salary" />
        </template>
        <template v-slot:item.payed="{ item }">
          <w-usd :amount="item.payed" />
        </template>
        <template v-slot:item.remaining="{ item }">
          <w-usd :color="item.total_salary - item.payed > 0 ? 'red' : 'black'" :amount="item.total_salary - item.payed" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { MonthPicker } from 'vue-month-picker'
import { useDate } from 'vuetify'
import { type TPayroll } from "~/composables/payroll/index";


const headers = [
  { title: 'Employee', key: 'employee' },
  { title: 'Total', key: 'total_salary' },
  { title: 'Payed', key: 'payed' },
  { title: 'Remaining', key: 'remaining', align: 'end' }
]

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

const defaultMonth: ComputedRef<number> = computed(() => {

  return useDate().getMonth(new Date) + 1
});
const defaultYear: ComputedRef<number> = computed(() => {
  return useDate().getYear(new Date)
}
);

const payroll = ref<{
  year: number,
  month: number,
}>({
  year: defaultYear.value,
  month: defaultMonth.value,
});

function setPayrollDate(datePickerData: any) {
  console.log(datePickerData)
  if (!datePickerData.month || !datePickerData.month || !datePickerData.from) return
  payroll.value.month = Number(datePickerData.monthIndex)
  payroll.value.year = Number(datePickerData.year)
}

const payments: Ref<TPayroll[]> = ref([])

const loading = useLoading();
async function loadPayments() {
  payments.value = [];
  loading.start();
  const { models, error } = await usePayroll().search(payroll.value.year, payroll.value.month);
  loading.end();

  if (error) {
    return;
  }

  if (models) {
    payments.value = models;
  }
}


</script>

<style></style>