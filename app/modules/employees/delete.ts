import type {
  EmployeesRecord,
  EmployeesResponse,
} from "~/app/pocketbase-types";

export async function deleteEmployee(id: string) {
  return await usePocketBase().collection("employees").delete(id);
}
