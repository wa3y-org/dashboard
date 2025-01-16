import { backendRequestOne } from "~/app/core/BackendRequest";
import { PayrollCollection, type TPayroll } from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function createPayroll(payroll: TPayroll) {
  const response = await backendRequestOne<TPayroll>(async () => {
    return await PayrollCollection.create(Object.assign({}, payroll));
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.payroll,
    ];
    const obj_before = null;
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
