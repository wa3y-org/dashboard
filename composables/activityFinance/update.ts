import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { backendRequestOne } from "~/app/core/BackendRequest";
import { ActivityFinanceCollection, type TActivityFinance } from "./index";
import {
  ActivitiesFinanceTypeOptions,
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function updateActivityFinance(
  finance: TActivityFinance
): Promise<OneModelResponse<TActivityFinance>> {
  async function activityFinanceUpdater() {
    return await ActivityFinanceCollection.update(finance.id, {
      fund_facility: finance.fund_facility,
      amount: finance.amount,
      statement: finance.statement,
    });
  }

  const activityFinance = await ActivityFinanceCollection.getOne(finance.id);
  const response = await backendRequestOne<TActivityFinance>(
    activityFinanceUpdater
  );

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.UPDATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.projects,
      UserActivitiesCategoriesOptions.project_activities,
      UserActivitiesCategoriesOptions.finance,
      activityFinance.type == ActivitiesFinanceTypeOptions.donation
        ? UserActivitiesCategoriesOptions.donations
        : UserActivitiesCategoriesOptions.expenses,
    ];
    const obj_before = activityFinance;
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
