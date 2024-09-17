import { backendRequestOne } from "~/app/core/BackendRequest";
import { EmployeesAdvancesCollection, type TAdvance } from "./index";
import type {
  EmployeesRecord,
  EmployeesResponse,
} from "~/app/pocketbase-types";
import type { AuthModel } from "pocketbase";

type TEmployee = EmployeesRecord & EmployeesResponse & AuthModel;

export async function addEmployeeAdvance(
  employee: TEmployee,
  advance: TAdvance
) {
  return await backendRequestOne<TAdvance>(async () => {
    return await EmployeesAdvancesCollection.create({
      employee: employee.id,
      amount: advance.amount,
      payed: 0,
      statement: advance.statement,
    });
  });
}
