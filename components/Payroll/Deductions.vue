<template>
  <v-expansion-panel class="rounded-lg border">
    <v-expansion-panel-title>
      <span class="font-weight-bold">
        Deductions
      </span>
      <v-spacer></v-spacer>
      <w-usd color="red" :amount="deductionsTotal" />
    </v-expansion-panel-title>
    <v-divider></v-divider>
    <v-expansion-panel-text>
      <v-table>
        <thead class="font-weight-black text-primary">
          <tr>
            <td width="250">amount</td>
            <td class="">Statement</td>
            <td class="text-end"><v-btn color="primary" disabled icon="mdi-delete" variant="text" /></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="deduction of model?.deductions">
            <td><w-usd color="red" :amount="deduction.amount" /></td>
            <td>{{ deduction.statement }}</td>
            <td class="text-end">
              <v-btn color="error" icon="mdi-delete" variant="text" @click="remove(deduction)" />
            </td>
          </tr>

        </tbody>
      </v-table>
      <v-table class="border rounded-lg mt-2">
        <tr style="vertical-align: top;">
          <td class="text-center pa-2">
            <NumberField :props="{
              min: 0.1,
            }" v-model="deductionToAdd.amount" name="amount" placeholder="Enter amount" />
          </td>
          <td class="text-center pa-2">
            <TextareaField v-model="deductionToAdd.statement" :props="{
              rows: 1
            }" name="statement" placeholder="Enter statement" />
          </td>
          <td class="text-end pa-2 pt-3" width="10">
            <v-btn icon="mdi-plus-thick" @click="addDeduction" :disabled="!canAdd" color="primary" />
          </td>
        </tr>
      </v-table>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script lang="ts" setup>
const model = defineModel();

const deductionsTotal = computed(() => {
  let totalDeductions = 0;
  for (let deduction of model.value?.deductions) {
    totalDeductions += deduction.amount;
  }
  return totalDeductions;
})

const deductionToAdd = ref({
  amount: null,
  statement: null,
})

const canAdd = computed(() => {
  if (isAdding.value) return false;
  if (!deductionToAdd.value.amount || deductionToAdd.value.amount < 0.1) return;
  return true;
});
const isAdding = ref(false);

function addDeduction() {
  if (!canAdd.value) return;
  isAdding.value = true;
  model.value?.deductions?.push(deductionToAdd.value);
  deductionToAdd.value = {
    amount: null,
    statement: null,
  }
  isAdding.value = false;
}

const Remover = useConfirmRemove()
async function remove(deduction: any) {
  const { isConfirmed } = await Remover.confirm();
  if (isConfirmed) {
    Remover.doRemove(() => {
      model.value?.deductions.splice(
        model.value?.deductions.indexOf(deduction), 1
      )
    })
  }
}
</script>

<style></style>