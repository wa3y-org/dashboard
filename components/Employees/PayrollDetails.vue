<template>
  <v-dialog :model-value="show" max-width="960px" transition="dialog-transition">
    <v-card rounded="lg">
      <v-toolbar color="transparent">
        <v-toolbar-title>
          <v-icon>mdi-cash-multiple mdi-rotate-225</v-icon>
          <span class="mx-4 font-weight-bold">
            Payroll Details
          </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" color="red" @click="close" />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-card-actions class="border border-lg rounded-lg font-weight-black ">
          <span class="text-primary">
            Total Salary : <w-usd color="primary" :amount="payroll.total_salary" />
          </span>
          <v-spacer></v-spacer>
          <span class="text-success">
            Payed : <w-usd color="success" :amount="payroll.payed" />
          </span>
          <v-spacer></v-spacer>
          <span :class="payroll.total_salary - payroll.payed > 0 ? 'text-red' : 'text-black'">
            Remaining : <w-usd :amount="payroll.total_salary - payroll.payed"
              :color="payroll.total_salary - payroll.payed > 0 ? 'red' : 'black'" />
          </span>
        </v-card-actions>
        <div class="my-4"></div>
        <v-card-actions class="border-primary border-lg rounded-lg ">
          <span class="font-weight-black text-primary">
            Basic Salary
          </span>
          <v-spacer></v-spacer>
          <w-usd color="primary" :amount="payroll.salary_details.basic_salary" />
        </v-card-actions>
        <div class="my-4"></div>
        <v-table class="border-lg border-success rounded-lg">
          <thead>
            <tr>
              <td colspan="2" style="border-bottom: 1px dashed #CCC;">
                <v-card-actions>
                  <span class="font-weight-black text-green">
                    Allowances
                  </span>
                  <v-spacer></v-spacer>
                  <w-usd :amount="totalAllowances" />
                </v-card-actions>
              </td>
            </tr>
          </thead>
          <thead class="font-weight-black text-primary">
            <tr>
              <td width="250">amount</td>
              <td class="">Statement</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="allowance of payroll.salary_details.allowances">
              <td><w-usd :amount="allowance.amount" /></td>
              <td>{{ allowance.statement }}</td>

            </tr>

          </tbody>
        </v-table>
        <div class="my-3"></div>
        <v-table class="border-lg border-error rounded-lg">
          <thead>
            <tr>
              <td colspan="2" style="border-bottom: 1px dashed #CCC;">
                <v-card-actions>
                  <span class="font-weight-black text-red">
                    Deductions
                  </span>
                  <v-spacer></v-spacer>
                  <w-usd color="red" :amount="totalDeductions" />
                </v-card-actions>

              </td>
            </tr>
          </thead>
          <thead class="font-weight-black text-primary">
            <tr>
              <td width="250">amount</td>
              <td class="">Statement</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="deduction of payroll.salary_details.deductions">
              <td><w-usd color="red" :amount="deduction.amount" /></td>
              <td>{{ deduction.statement }}</td>

            </tr>

          </tbody>
        </v-table>
      </v-card-text>
    </v-card>

  </v-dialog>
</template>

<script lang="ts" setup>
const props = defineProps(['show', 'payroll']);
const emit = defineEmits(['close'])

function close() {
  emit('close');
}

const totalAllowances = computed(() => {
  let total = 0;
  for (let allowance of props.payroll?.salary_details.allowances) {
    total += allowance.amount;
  }
  return total;
})

const totalDeductions = computed(() => {
  let total = 0;
  for (let deduction of props.payroll?.salary_details.deductions) {
    total += deduction.amount;
  }
  return total;
})
</script>

<style></style>