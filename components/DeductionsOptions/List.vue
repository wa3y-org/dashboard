<template>
  <deductions-options-update v-model="selectedDeduction" @saved="handleDeductionUpdate"
    :show="updateDeductionModal.isShown.value" @close="updateDeductionModal.hide" />
  <div>
    <loading-from-backend v-if="loading.isLoading.value" />
    <v-table v-else class="border rounded-lg" height="300px" fixed-header fixed-footer>
      <thead>
        <tr>
          <th>title</th>
          <th>Amount</th>
          <th>Description</th>
          <th class="text-end">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="deduction of deductionsList">
          <td>{{ deduction.title }}</td>
          <td class="font-weight-black">{{ deduction.amount }} USD</td>
          <td v-html="deduction.description"></td>
          <td class="text-end pa-2">
            <v-btn color="success" icon="mdi-pencil" variant="tonal" size="small" @click="selectDeduction(deduction)" />
            <span class="mx-2"></span>
            <v-btn color="error" icon="mdi-delete" variant="tonal" size="small"
              @click="confirmRemoveDeduction(deduction)" />
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import type { DeductionOptionsRecord } from "~/app/pocketbase-types";

const { fetchDeductions, removeDeduction } = useDeductions();

const { loading, deductionsList, loadDeductions } = fetchDeductions()


async function confirmRemoveDeduction(deduction: DeductionOptionsRecord) {
  const remove = useConfirmRemove();
  const isConfirmed = (await remove.confirm()).isConfirmed;
  if (isConfirmed) {
    await remove.doRemove(async () => {
      await removeDeduction(deduction.id)
    })
    loadDeductions()
  }
}

onMounted(() => {
  const { $activeModalsBus } = useNuxtApp();
  $activeModalsBus.$on('deduction:created', loadDeductions)
  $activeModalsBus.$on('deduction:updated', loadDeductions)
})

const selectedDeduction: Ref<DeductionOptionsRecord | null> = ref(null)
function selectDeduction(deduction: DeductionOptionsRecord) {
  selectedDeduction.value = Object.assign({}, deduction);
  updateDeductionModal.show();
}
const updateDeductionModal = useModal();
function handleDeductionUpdate() {
  updateDeductionModal.hide();
}


</script>

<style></style>