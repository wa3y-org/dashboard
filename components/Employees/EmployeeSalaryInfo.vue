<template>
  <employees-payroll-details
   :payroll="payrollToShow"
   :show="payrollDetailsModal.isShown.value" @close="payrollDetailsModal.hide" />
  <div>
    <v-table class="border-xl elevation-2 mx-4 mb-8 border-success rounded-xl font-weight-black text-center">
      <tr>
        <td class="border pa-4">
          Salary :
          <w-usd :amount="employee?.basic_salary" />
        </td>
        <td class="border pa-4">
          Allowances : <w-usd :amount="totalAllowancesAmount" />
        </td>
        <td class="border pa-4">
          Deductions : <w-usd :amount="totalDeductionsAmount" />
        </td>
        <td class="px-4">
          Total: <w-usd :amount="totalSalary" /> /month
        </td>
      </tr>
    </v-table>
    <span class="font-weight-bold">

    </span>
  </div>
  <v-divider class="mt-4"></v-divider>
  <p class="font-weight-bold text-h6 mt-4">Allowances</p>
  <v-table class="border rounded-xl my-4">
    <thead class="bg-grey-lighten-4 font-weight-black">
      <tr>
        <th>#</th>
        <th>title</th>
        <th>amount</th>
        <th>description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(allowance, index) of employee?.expand?.allowances || []" :key="allowance.id">
        <td>{{ index + 1 }}</td>
        <td>{{ allowance.title }}</td>
        <td><w-usd :amount="allowance.amount" /></td>
        <td class="text-end">
          {{ allowance.description }}
        </td>
      </tr>
      <tr class="bg-green-lighten-5 ">
        <td colspan="4" class="font-weight-bold text-end text-h6 border">
          Total : <w-usd :amount="totalAllowancesAmount" />
        </td>
      </tr>
    </tbody>

  </v-table>

  <p class="font-weight-bold text-h6 mt-4">Deductions</p>
  <v-table class="border rounded-xl my-4">
    <thead class="bg-grey-lighten-4 font-weight-black">
      <tr>
        <th>#</th>
        <th>title</th>
        <th>amount</th>
        <th>description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(deduction, index) of employee?.expand?.deductions || []" :key="deduction.id">
        <td>{{ index + 1 }}</td>
        <td>{{ deduction.title }}</td>
        <td><w-usd :amount="deduction.amount" /></td>
        <td class="text-end">
          {{ deduction.description }}
        </td>
      </tr>
      <tr class="bg-red-lighten-5 ">
        <td colspan="4" class="font-weight-bold text-end text-h6 border">
          Total : <w-usd :amount="totalDeductionsAmount" />
        </td>
      </tr>
    </tbody>

  </v-table>
  <v-divider class="my-4"></v-divider>
  <div>
    <p class="font-weight-bold text-h6 my-4">Payment History</p>
    <v-data-table :headers="headers" :items="payments" item-key="id" :loading="loading.isLoading.value">
      <template v-slot:item.year="{ item }">
        <span class="font-weight-bold">{{ item.year }}</span>
      </template>
      <template v-slot:item.month="{ item }">

        <span class="font-weight-bold">
          {{ getMonthNameFromIndex(item.month) }}
          <span class="mx-2"></span>
          <v-chip>{{ item.month }}</v-chip>
        </span>

      </template>
      <template v-slot:item.total_salary="{ item }">
        <span class="font-weight-bold">
          <w-usd color="primary" :amount="item.total_salary" />
        </span>

      </template>
      <template v-slot:item.payed="{ item }">
        <span class="font-weight-bold">
          <w-usd :amount="item.payed" />
        </span>
      </template>
      <template v-slot:item.remaining="{ item }">
        <span class="font-weight-bold">
          <w-usd :amount="item.total_salary - item.payed" :color="item.total_salary - item.payed > 0 ? 'red' : 'black'" />
        </span>

      </template>
      <template v-slot:item.created="{ item }">
        <span class="font-weight-bold">
          <v-btn color="primary" icon="mdi-file-document" variant="text" @click="showPayrollDetails(item)"></v-btn>
          <span class="mx-2"></span>
          <date-view :date="item.created" :show-time="true" />
        </span>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import { type TPayroll } from "~/composables/payroll/index";

const props = defineProps(['employee'])

const totalAllowancesAmount = computed(() => {
  let total = 0;
  for (let allowance of props.employee?.expand?.allowances || []) {
    total += allowance.amount;
  }
  return total.toFixed(2);
})

const totalDeductionsAmount = computed(() => {
  let total = 0;
  for (let deduction of props.employee?.expand?.deductions || []) {
    total += deduction.amount;
  }
  return total.toFixed(2);
})

const totalSalary = computed(() => {
  return Number(props.employee?.basic_salary) + Number(totalAllowancesAmount.value) - Number(totalDeductionsAmount.value)
})

const headers = [
  { title: 'Year', key: 'year' },
  { title: 'Month', key: 'month' },
  { title: 'Total', key: 'total_salary' },
  { title: 'Payed', key: 'payed' },
  { title: 'Remaining', key: 'remaining' },
  { title: 'Date', key: 'created', align: 'end' },
]

const payments: Ref<TPayroll[]> = ref([])

const loading = useLoading();
async function loadPayments() {
  payments.value = [];
  loading.start();
  const { models, error } = await usePayroll().get.employeePayroll(props.employee);
  loading.end();

  if (error) {
    return;
  }

  if (models) {
    payments.value = models;
  }
}

onMounted(loadPayments);

function getMonthNameFromIndex(index: number) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return monthNames[index - 1]
}

const payrollDetailsModal = useModal();
const payrollToShow = ref<any>();

function showPayrollDetails(payroll: TPayroll) {
  payrollToShow.value = payroll;
  payrollDetailsModal.show();
}


</script>

<style></style>