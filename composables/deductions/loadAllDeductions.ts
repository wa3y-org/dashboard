
import { getDeductions } from "~/app/modules/salary/deductions";
import type { DeductionOptionsRecord } from "~/app/pocketbase-types";

export function fetchDeductions() {
  const loading = useLoading();

  const deductionsList: Ref<DeductionOptionsRecord[]> = ref([]);

  async function loadDeductions() {
    loading.start();
    deductionsList.value = await getDeductions();
    loading.end();
  }

  onMounted(() => {
    loadDeductions();
  });

  return {
    loading,
    deductionsList,
    loadDeductions,
  };
}
