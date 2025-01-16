import { FinanceCollection, type TFinance } from "./index";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  FinanceTypeOptions,
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function addFinance(
  finance: TFinance
): Promise<OneModelResponse<TFinance>> {
  async function financeCreator() {
    return await FinanceCollection.create({
      fund_facility: finance.fund_facility,
      amount: finance.amount,
      statement: finance.statement,
      type: finance.type,
    });
  }

  const response = await backendRequestOne<TFinance>(financeCreator);

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      finance.type == FinanceTypeOptions.donation
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
