import { ProjectFinanceCollection, type TProjectFinance } from "./index";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  ProjectFinanceTypeOptions,
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function updateProjectFinance(
  finance: TProjectFinance
): Promise<OneModelResponse<TProjectFinance>> {
  async function projectFinanceUpdater() {
    return await ProjectFinanceCollection.update(finance.id, {
      fund_facility: finance.fund_facility,
      amount: finance.amount,
      statement: finance.statement,
      transaction_fees: finance.transaction_fees,
    });
  }

  const Data = await ProjectFinanceCollection.getOne(finance.id);
  const response = await backendRequestOne<TProjectFinance>(
    projectFinanceUpdater
  );

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.UPDATE;
    
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.projects,
      Data.type == ProjectFinanceTypeOptions.donation
        ? UserActivitiesCategoriesOptions.donations
        : UserActivitiesCategoriesOptions.expenses,
    ];
    const obj_before = Data;
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
