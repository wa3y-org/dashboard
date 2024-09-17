import { backendRequestOne } from "~/app/core/BackendRequest";
import { EmployeesAdvancesCollection, type TAdvance } from "./index";

export async function removeEmployeeAdvance(advance: TAdvance) {
  return await backendRequestOne<TAdvance>(async () => {
    return await EmployeesAdvancesCollection.delete(advance.id);
  });
}
