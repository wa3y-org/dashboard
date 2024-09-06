<template>
  <allowances-options-update v-model="selectedAllowance" @saved="handleAllowanceUpdate"
    :show="updateAllowanceModal.isShown.value" @close="updateAllowanceModal.hide" />
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
        <tr v-for="allowance of allowancesList">
          <td>{{ allowance.title }}</td>
          <td class="font-weight-black">{{ allowance.amount }} USD</td>
          <td v-html="allowance.description"></td>
          <td class="text-end pa-2">
            <v-btn color="success" icon="mdi-pencil" variant="tonal" size="small" @click="selectAllowance(allowance)" />
            <span class="mx-2"></span>
            <v-btn color="error" icon="mdi-delete" variant="tonal" size="small"
              @click="confirmRemoveAllowance(allowance)" />
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import type { AllowanceOptionsRecord } from "~/app/pocketbase-types";

const { fetchAllowances, removeAllowance } = useAllowances();

const { loading, allowancesList, loadAllowances } = fetchAllowances()


async function confirmRemoveAllowance(allowance: AllowanceOptionsRecord) {
  const remove = useConfirmRemove();
  const isConfirmed = (await remove.confirm()).isConfirmed;
  if (isConfirmed) {
    await remove.doRemove(async () => {
      await removeAllowance(allowance.id)
    })
    loadAllowances()
  }
}

onMounted(() => {
  const { $activeModalsBus } = useNuxtApp();
  $activeModalsBus.$on('allowance:created', loadAllowances)
  $activeModalsBus.$on('allowance:updated', loadAllowances)
})

const selectedAllowance: Ref<AllowanceOptionsRecord | null> = ref(null)
function selectAllowance(allowance: AllowanceOptionsRecord) {
  selectedAllowance.value = Object.assign({}, allowance);
  updateAllowanceModal.show();
}
const updateAllowanceModal = useModal();
function handleAllowanceUpdate() {
  updateAllowanceModal.hide();
}


</script>

<style></style>