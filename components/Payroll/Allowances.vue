<template>
  <v-expansion-panel class="rounded-lg border">
    <v-expansion-panel-title>
      <span class="font-weight-bold">
        Allowances
      </span>
      <v-spacer></v-spacer>
      <w-usd :amount="allowancesTotal" />
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
          <tr v-for="allowance of model?.allowances">
            <td><w-usd :amount="allowance.amount" /></td>
            <td>{{ allowance.statement }}</td>
            <td class="text-end">
              <v-btn color="error" icon="mdi-delete" variant="text" @click="remove(allowance)" />
            </td>
          </tr>

        </tbody>
      </v-table>
      <v-table class="border rounded-lg mt-2">
        <tr style="vertical-align: top;">
          <td class="text-center pa-2">
            <NumberField :props="{
              min: 0.1,
            }" v-model="allowanceToAdd.amount" name="amount" placeholder="Enter amount" />
          </td>
          <td class="text-center pa-2">
            <TextareaField v-model="allowanceToAdd.statement" :props="{
              rows: 1
            }" name="statement" placeholder="Enter statement" />
          </td>
          <td class="text-end pa-2 pt-3" width="10">
            <v-btn icon="mdi-plus-thick" @click="addAllowance" :disabled="!canAdd" color="primary" />
          </td>
        </tr>
      </v-table>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script lang="ts" setup>
const model = defineModel();

const allowancesTotal = computed(() => {
  let totalAllowances = 0;
  for (let allowance of model.value?.allowances) {
    totalAllowances += allowance.amount;
  }
  return totalAllowances;
})

const allowanceToAdd = ref({
  amount: null,
  statement: null,
})

const canAdd = computed(() => {
  if (isAdding.value) return false;
  if (!allowanceToAdd.value.amount || allowanceToAdd.value.amount < 0.1) return;
  return true;
});
const isAdding = ref(false);

function addAllowance() {
  if (!canAdd.value) return;
  isAdding.value = true;
  model.value?.allowances?.push(allowanceToAdd.value);
  allowanceToAdd.value = {
    amount: null,
    statement: null,
  }
  isAdding.value = false;
}

const Remover = useConfirmRemove()
async function remove(allowance: any) {
  const { isConfirmed } = await Remover.confirm();
  if (isConfirmed) {
    Remover.doRemove(() => {
      model.value?.allowances.splice(
        model.value?.allowances.indexOf(allowance), 1
      )
    })
  }
}
</script>

<style></style>