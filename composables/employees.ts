import { getAllEmployees, getOneEmployee } from "~/app/modules/employees/get";
import type { EmployeesRecord } from "~/app/pocketbase-types";

export function useEmployees() {
  const employeesList: Ref<EmployeesRecord[]> = ref([]);

  const loading = useLoading();
  async function loadEmployees() {
    loading.start();
    employeesList.value = await getAllEmployees();
    loading.end();
  }

  async function loadOneEmployee(id: string) {
    loading.start();
    const record = await getOneEmployee(id);
    loading.end();

    return record;
  }

  return {
    loading,
    employeesList,
    loadEmployees,
    loadOneEmployee,
  };
}
