<template>
  <div>
    <h3 class="text-h5 mb-4 mt-8 font-weight-bold">Fixed Deductions</h3>
    <div class="d-flex align-center rounded-lg">
      <w-select-deductions v-model="selectedDeductions" :props="{
        multiple: true
      }" :hidden="employeeDeductions.values()" />
      <span class="mx-2"></span>
      <v-btn :disabled="selectedDeductions.length < 1" color="primary" size="large" icon="mdi-plus-thick" rounded="lg"
        @click="setEmployeeDeductions"></v-btn>
    </div>
    <v-table class="border rounded-lg my-4">
      <thead class="bg-grey-lighten-2 font-weight-black">
        <tr>
          <th>#</th>
          <th>title</th>
          <th>amount</th>
          <th class="text-end">remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(deduction, index) of employeeDeductions" :key="deduction.id">
          <td>{{ index + 1 }}</td>
          <td>{{ deduction.title }}</td>
          <td><w-usd :amount="deduction.amount" /></td>
          <td class="text-end">
            <v-btn icon="mdi-delete" color="error" variant="text" @click="confirmRemoveDeduction(deduction)" />
          </td>
        </tr>
        <tr class="bg-red-lighten-4 ">
          <td colspan="4" class="font-weight-bold text-end text-h6 border">
            Total : <w-usd :amount="totalAmount" />
          </td>
        </tr>
      </tbody>

    </v-table>

  </div>
</template>

<script lang="ts" setup>
import type { DeductionOptionsRecord } from "~/app/pocketbase-types";
import type { EmployeesRecord } from "~/app/pocketbase-types";

const employee = defineModel<EmployeesRecord>({ required: true })


const selectedDeductions: Ref<DeductionOptionsRecord[]> = ref([])

const employeeDeductions: Ref<Set<DeductionOptionsRecord>> = ref(new Set())

function setEmployeeDeductions() {
  for (let deduction of selectedDeductions.value) {
    employeeDeductions.value.add(deduction)
  }

  selectedDeductions.value = []
}

watch(employeeDeductions.value, () => {
  const ids = [];
  for (let deduction of employeeDeductions.value) {
    ids.push(deduction.id)
  }

  employee.value.deductions = ids;
})

const totalAmount = computed(() => {
  let total = 0;
  for (let deduction of employeeDeductions.value) {
    total += deduction.amount;
  }
  return total.toFixed(2);
})

async function confirmRemoveDeduction(deduction: DeductionOptionsRecord) {
  const remove = useConfirmRemove();
  const isConfirmed = (await remove.confirm()).isConfirmed;
  if (isConfirmed) {
    await remove.doRemove(() => {
      employeeDeductions.value.delete(deduction);
    })

  }
}
</script>

<style></style>