<template>
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
</template>

<script lang="ts" setup>
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
</script>

<style></style>