<template>
  <div>
    
    <h3 class="text-h5 mb-4 mt-8 font-weight-bold">Fixed Allowances</h3>
    <div class="d-flex align-center rounded-lg">
      <w-select-allowances v-model="selectedAllowances" :props="{
        multiple: true
      }" :hidden="employeeAllowances.values()" />
      <span class="mx-2"></span>
      <v-btn :disabled="selectedAllowances.length < 1" color="primary" size="large" icon="mdi-plus-thick" rounded="lg"
        @click="setEmployeeAllowances"></v-btn>
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
        <tr v-for="(allowance, index) of employeeAllowances" :key="allowance.id">
          <td>{{ index + 1 }}</td>
          <td>{{ allowance.title }}</td>
          <td><w-usd :amount="allowance.amount" /></td>
          <td class="text-end">
            <v-btn icon="mdi-delete" color="error" variant="text" @click="confirmRemoveAllowance(allowance)" />
          </td>
        </tr>
        <tr class="bg-green-lighten-4 ">
          <td colspan="4" class="font-weight-bold text-end text-h6 border">
            Total : <w-usd :amount="totalAmount" />
          </td>
        </tr>
      </tbody>

    </v-table>

  </div>
</template>

<script lang="ts" setup>
import type { AllowanceOptionsRecord } from "~/app/pocketbase-types";
import type { EmployeesRecord } from "~/app/pocketbase-types";

const employee = defineModel<EmployeesRecord>({ required: true })


const selectedAllowances: Ref<AllowanceOptionsRecord[]> = ref([])

const employeeAllowances: Ref<Set<AllowanceOptionsRecord>> = ref(new Set())

function setEmployeeAllowances() {
  for (let allowance of selectedAllowances.value) {
    employeeAllowances.value.add(allowance)
  }

  selectedAllowances.value = []
}

watch(employeeAllowances.value, () => {
  const ids = [];
  for (let allowance of employeeAllowances.value) {
    ids.push(allowance.id)
  }

  employee.value.allowances = ids;
})

onMounted(() => {
  if (employee.value.expand && employee.value.expand.allowances) {
    for (let allowance of employee.value.expand.allowances) {
      employeeAllowances.value.add(allowance)
    }
  }
})
// watch(() => employee.value, () => {
//   if (employee.value.expand && employee.value.expand.allowances) {
//     for (let allowance of employee.value.expand.allowances) {
//       employeeAllowances.value.add(allowance)
//     }
//   }
// }, { deep: true })

const totalAmount = computed(() => {
  let total = 0;
  for (let allowance of employeeAllowances.value) {
    total += allowance.amount;
  }
  return total.toFixed(2);
})

async function confirmRemoveAllowance(allowance: AllowanceOptionsRecord) {
  const remove = useConfirmRemove();
  const isConfirmed = (await remove.confirm()).isConfirmed;
  if (isConfirmed) {
    await remove.doRemove(() => {
      employeeAllowances.value.delete(allowance);
    })

  }
}
</script>

<style></style>