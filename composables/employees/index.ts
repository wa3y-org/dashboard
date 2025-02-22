import type { AuthModel } from "pocketbase";
import type {
  EmployeesRecord,
  EmployeesResponse,
} from "~/app/pocketbase-types";

export const EmployeesCollection = usePocketBase().collection("employees");
export type TEmployee = EmployeesRecord & (EmployeesResponse & AuthModel);
