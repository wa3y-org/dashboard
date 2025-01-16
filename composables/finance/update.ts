import { FinanceCollection, type TFinance } from "./index";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  FinanceTypeOptions,
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function updateFinance(
  finance: TFinance
): Promise<OneModelResponse<TFinance>> {
  async function FinanceUpdater() {
    return await FinanceCollection.update(finance.id, {
      fund_facility: finance.fund_facility,
      amount: finance.amount,
      statement: finance.statement,
    });
  }

  const financeData = await FinanceCollection.getOne(finance.id);
  const response = await backendRequestOne<TFinance>(FinanceUpdater);

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.UPDATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      financeData.type == FinanceTypeOptions.donation
        ? UserActivitiesCategoriesOptions.donations
        : UserActivitiesCategoriesOptions.expenses,
    ];
    const obj_before = financeData;
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
