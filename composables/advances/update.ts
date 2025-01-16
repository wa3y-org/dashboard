import { backendRequestOne } from "~/app/core/BackendRequest";
import { EmployeesAdvancesCollection, type TAdvance } from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function updateEmployeeAdvance(advance: TAdvance) {
  const advanceData = await EmployeesAdvancesCollection.getOne(advance.id);
  const response = await backendRequestOne<TAdvance>(async () => {
    return await EmployeesAdvancesCollection.update(
      advance.id,
      Object.assign({}, advance)
    );
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.UPDATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.advances,
      UserActivitiesCategoriesOptions.employees,
      UserActivitiesCategoriesOptions.payroll,
    ];
    const obj_before = advanceData;
    const obj_after = response.model;
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
