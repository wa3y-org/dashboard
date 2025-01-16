import { backendRequestOne } from "~/app/core/BackendRequest";
import { EmployeesAdvancesCollection, type TAdvance } from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function removeEmployeeAdvance(advance: TAdvance) {
  const advanceData = await EmployeesAdvancesCollection.getOne(advance.id);
  const response = await backendRequestOne<TAdvance>(async () => {
    return await EmployeesAdvancesCollection.delete(advance.id);
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.advances,
      UserActivitiesCategoriesOptions.employees,
      UserActivitiesCategoriesOptions.payroll,
    ];
    const obj_before = advanceData;
    const obj_after = null;
    const comment = null;

    useActivityMonitor().create(
      action,
      categories,
      obj_before,
      obj_after,
      comment
    );
  }

  return response;
}
