import { backendRequestOne } from "~/app/core/BackendRequest";
import { ProjectFinanceCollection, type TProjectFinance } from "./index";
import {
  ProjectFinanceTypeOptions,
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function removeFinance(id: string) {
  async function financeRemover() {
    return await ProjectFinanceCollection.delete(id);
  }

  const Data = await ProjectFinanceCollection.getOne(id);
  const response = await backendRequestOne<TProjectFinance>(financeRemover);

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;

    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.projects,
      Data.type == ProjectFinanceTypeOptions.donation
        ? UserActivitiesCategoriesOptions.donations
        : UserActivitiesCategoriesOptions.expenses,
    ];
    const obj_before = Data;
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
