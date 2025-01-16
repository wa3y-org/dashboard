import { backendRequestOne } from "~/app/core/BackendRequest";
import { FinanceCollection, type TFinance } from "./index";
import {
  FinanceTypeOptions,
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function removeFinance(id: string) {
  async function financeRemover() {
    return await FinanceCollection.delete(id);
  }

  const financeData = await FinanceCollection.getOne(id);
  const response = await backendRequestOne<TFinance>(financeRemover);

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      financeData.type == FinanceTypeOptions.donation
        ? UserActivitiesCategoriesOptions.donations
        : UserActivitiesCategoriesOptions.expenses,
    ];
    const obj_before = financeData;
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
