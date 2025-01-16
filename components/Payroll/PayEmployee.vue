<template>
  <v-dialog :model-value="show" scrollable persistent :overlay="false" max-width="1120px"
    transition="dialog-transition">
    <v-card rounded="lg" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar color="transparent">
        <v-toolbar-title class="font-weight-bold">
          <v-icon class="mx-2">mdi-cash-plus</v-icon>
          Pay Employee
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="cancel" />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text class="py-2 my-2">
        <PayrollEmployeeCard :employee="employee" v-model="payroll" />

        <v-expansion-panels class="rounded-lg">
          <PayrollAllowances v-model="salaryDetails" />
          <PayrollDeductions v-model="salaryDetails" />
        </v-expansion-panels>

      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="pa-3">
        <div class="font-weight-black mt-2">
          <v-chip class="px-0 ,mx-auto" size="x-large">
            <span class="mx-2"></span>
            <w-usd color="black" :amount="salaryDetails.basic_salary" />
            +
            <w-usd :amount="salaryTotal.allowances" />
            -
            <w-usd color="red" :amount="salaryTotal.deductions" />
            =
            <v-chip density="default" color="primary" class="mx-2">
              <w-usd color="primary" :amount="salaryTotal.salary" />
            </v-chip>

          </v-chip>
        </div>
        <v-spacer></v-spacer>
        <NumberField name="Payed Amount" :props="{
          min: 0.1,
          max: salaryTotal.salary,
          density: 'comfortable',
          suffix: 'USD',
          'persistent-placeholder': true,
        }" :placeholder="`Amount  1 -- ${salaryTotal.salary.toFixed(2)}`" :errors="validationErrors.payed"
          v-model="payroll.payed" readonly />
      </v-card-actions>
      <div v-if="backendError.error && backendError.hasError" class="my-4">
        <v-divider class="my-4"></v-divider>
        <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error"
          v-if="backendError.hasError" />
      </div>
      <v-divider></v-divider>
      <v-card-actions class="pa-4">
        <v-alert type="error" :value="true" variant="text" v-if="Errors.hasError(validationErrors)">
          Input Validation Error
        </v-alert>
        <v-spacer></v-spacer>
        <SaveCancelBtn :loading="loading.isLoading.value" @cancel="cancel" @save="save" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { type EmployeesRecord, type EmployeesResponse } from "~/app/pocketbase-types";
import type { AuthModel, BaseModel } from "pocketbase";
import { useDate } from 'vuetify'
import type { TAdvance } from "~/composables/advances";


type TEmployee = EmployeesRecord & EmployeesResponse & BaseModel & AuthModel


const required = true;
const props = defineProps({
  show: {
    type: Boolean,
    required
  },
  employee: {
    type: Object,
    required
  }
})

const emit = defineEmits(['cancel', 'saved'])



function cancel() {
  emit('cancel')
}

const employeeData = computed<TEmployee>(() => { return props.employee });


const defaultMonth = computed(() => useDate().getMonth(new Date) + 1);
const defaultYear = computed(() => useDate().getYear(new Date));

const payroll = ref({
  year: defaultYear.value,
  month: defaultMonth.value,
  payed: null,
});

const advances = ref<TAdvance[]>([])

async function loadAdvances() {
  loading.start();
  const response = await useEmployeesAdvances().get.employeeAdvances(employeeData.value);
  loading.end();

  if (response.error) backendError.set(response.error);

  advances.value = response.models || [];

  let amount = 0;
  for (let advance of advances.value) {
    amount = Number(advance.amount) - Number(advance.payed);
    if (amount > Number(advance.deduction)) amount = advance.deduction;
    salaryDetails.value.deductions.push({
      amount: amount,
      statement: `Advance Payment -- id:${advance.id}`,
    })
  }

}


watch(() => props.show, () => {

  if (props.show) loadAdvances();
});

const salaryDetails = ref<{
  basic_salary: number;
  allowances: any[],
  deductions: any[],
}>({
  basic_salary: employeeData.value?.basic_salary || 0,
  allowances: [],
  deductions: [],
})

function resetSalaryDetails() {
  salaryDetails.value = {
    basic_salary: employeeData.value?.basic_salary || 0,
    allowances: [],
    deductions: [],
  }
}
function extractSalaryDetails() {
  resetSalaryDetails();
  for (let allowance of employeeData.value?.expand?.allowances || []) {
    salaryDetails.value.allowances.push({
      amount: allowance.amount,
      statement: allowance.title,
    })
  }

  for (let deduction of employeeData.value?.expand?.deductions || []) {
    salaryDetails.value.deductions.push({
      amount: deduction.amount,
      statement: deduction.title,
    })
  }



}

watch(() => props.show, () => {
  if (props.show) {
    backendError.clear();
    isFirstAttempt.value = true;
    payroll.value = {
      year: defaultYear.value,
      month: defaultMonth.value,
      payed: null,
    }
    extractSalaryDetails();
  }
}, { deep: true })

const salaryTotal = computed(() => {
  let totalAllowances = 0;
  for (let allowance of salaryDetails.value.allowances) {
    totalAllowances += allowance.amount;
  }

  let totalDeductions = 0;
  for (let deduction of salaryDetails.value.deductions) {
    totalDeductions += deduction.amount;
  }

  const cumulativeSalary = salaryDetails.value.basic_salary + totalAllowances - totalDeductions;

  payroll.value.payed = cumulativeSalary;
  return {
    allowances: totalAllowances,
    deductions: totalDeductions,
    salary: cumulativeSalary,
  }
});

const payrollObject = computed(() => {
  return {
    employee: props.employee.id,
    year: payroll.value.year,
    month: payroll.value.month,
    total_salary: salaryTotal.value.salary,
    payed: payroll.value.payed,
    salary_details: salaryDetails.value,
  }
});

const Payroll = usePayroll();

const isFirstAttempt = ref(true);

const validationErrors = computed(() => {
  if (isFirstAttempt.value) return {};
  return Payroll.validate(payrollObject.value);
});

const backendError = useBackendError();
const Errors = useErrors();

const loading = useLoading();
async function save() {
  isFirstAttempt.value = false;
  backendError.clear();
  if (Errors.hasError(validationErrors.value)) return;
  loading.start();
  const { error } = await Payroll.create(payrollObject.value);
  let id = null;
  for (let deduction of salaryDetails.value.deductions) {
    id = deduction.statement.split("Advance Payment -- id:")[1];
    if (id) {
      useEmployeesAdvances().addPayment({ id }, {
        amount: deduction.amount,
        statement: `Payroll Deduction ${payrollObject.value.year}/${payrollObject.value.month.toString().padStart(2,"0")}`,
      })
    }
  }

  loading.end();

  if (error) {
    backendError.set(error);
    return;
  }

  emit('saved')

  isFirstAttempt.value = true;
}
</script>

<style></style>