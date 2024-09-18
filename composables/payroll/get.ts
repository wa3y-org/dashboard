import { backendRequestMultiple } from "~/app/core/BackendRequest";
import { PayrollCollection, type TPayroll } from "./index";
import type { AuthModel, BaseModel } from "pocketbase";

export async function searchPayroll(year: number, month: number) {
  return await backendRequestMultiple<TPayroll>(async () => {
    return await PayrollCollection.getFullList({
      sort: "-created",
      filter: `year=${year} && month="${month}"`,
      expand: "employee",
    });
  });
}

export async function employeePayroll(employee: BaseModel) {
  return await backendRequestMultiple<TPayroll>(async () => {
    return await PayrollCollection.getFullList({
      sort: "-created",
      filter: `employee="${employee.id}"`,
    });
  });
}
