import { backendRequestOne } from "~/app/core/BackendRequest";
import { PayrollCollection, type TPayroll } from "./index";

export async function createPayroll(payroll: TPayroll) {
  return await backendRequestOne<TPayroll>(async () => {
    return await PayrollCollection.create(Object.assign({}, payroll));
  });
}
