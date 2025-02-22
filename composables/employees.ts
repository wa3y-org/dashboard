import { getAllEmployees, getOneEmployee } from "~/app/modules/employees/get";
import type { EmployeesRecord } from "~/app/pocketbase-types";
import type { TEmployee } from "./employees/index";

export function useEmployees() {
  const employeesList: Ref<TEmployee[]> = ref([]);

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
