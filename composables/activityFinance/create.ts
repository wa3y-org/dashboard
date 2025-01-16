import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { backendRequestOne } from "~/app/core/BackendRequest";
import type { TActivity } from "../activities";
import { ActivityFinanceCollection, type TActivityFinance } from "./index";
import {
  ActivitiesFinanceTypeOptions,
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function addActivityFinance(
  activity: TActivity,
  finance: TActivityFinance
): Promise<OneModelResponse<TActivityFinance>> {
  async function activityFinanceCreator() {
    return await ActivityFinanceCollection.create({
      activity: activity.id,
      fund_facility: finance.fund_facility,
      amount: finance.amount,
      statement: finance.statement,
      type: finance.type,
    });
  }

  const response = await backendRequestOne<TActivityFinance>(
    activityFinanceCreator
  );

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.projects,
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.project_activities,
      response.model.type == ActivitiesFinanceTypeOptions.donation
        ? UserActivitiesCategoriesOptions.donations
        : UserActivitiesCategoriesOptions.expenses,
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
