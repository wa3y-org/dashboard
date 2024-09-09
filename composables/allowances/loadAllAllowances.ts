import { getAllowances } from "@/app/modules/salary/allowances";
import type { AllowanceOptionsRecord } from "~/app/pocketbase-types";

export function fetchAllowances() {
  const loading = useLoading();

  const allowancesList: Ref<AllowanceOptionsRecord[]> = ref([]);

  async function loadAllowances() {
    loading.start();
    allowancesList.value = await getAllowances();
    loading.end();
  }

  onMounted(() => {
    loadAllowances();
  });

  return {
    loading,
    allowancesList,
    loadAllowances,
  };
}
