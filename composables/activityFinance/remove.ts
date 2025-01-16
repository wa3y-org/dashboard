import { backendRequestOne } from "~/app/core/BackendRequest";
import { ActivityFinanceCollection, type TActivityFinance } from "./index";
import {
  ActivitiesFinanceTypeOptions,
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function removeFinance(id: string) {
  async function financeRemover() {
    return await ActivityFinanceCollection.delete(id);
  }

  const activityFinance = await ActivityFinanceCollection.getOne(id);
  const response = await backendRequestOne<TActivityFinance>(financeRemover);

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.projects,
      UserActivitiesCategoriesOptions.project_activities,
      UserActivitiesCategoriesOptions.finance,
      activityFinance.type == ActivitiesFinanceTypeOptions.donation
        ? UserActivitiesCategoriesOptions.donations
        : UserActivitiesCategoriesOptions.expenses,
    ];
    const obj_before = activityFinance;
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
