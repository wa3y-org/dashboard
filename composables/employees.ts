import { getAllEmployees } from "~/app/modules/employees/get";
import type { EmployeesRecord } from "~/app/pocketbase-types";

export function useEmployees() {
  const employeesList: Ref<EmployeesRecord[]> = ref([]);

  const loading = useLoading();
  async function loadEmployees() {
    loading.start();
    employeesList.value = await getAllEmployees();
    loading.end();
  }

  return {
    loading,
    employeesList,
    loadEmployees,
  };
}
