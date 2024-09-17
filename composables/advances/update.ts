import { backendRequestOne } from "~/app/core/BackendRequest";
import { EmployeesAdvancesCollection, type TAdvance } from "./index";

export async function updateEmployeeAdvance(advance: TAdvance) {
  return await backendRequestOne<TAdvance>(async () => {
    return await EmployeesAdvancesCollection.update(
      advance.id,
      Object.assign({}, advance)
    );
  });
}
