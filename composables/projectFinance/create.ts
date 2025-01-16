import type { CollectionModel } from "pocketbase";
import { ProjectFinanceCollection, type TProjectFinance } from "./index";
import type { TProject } from "../projects/index";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  ProjectFinanceTypeOptions,
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function addProjectFinance(
  project: TProject,
  finance: TProjectFinance
): Promise<OneModelResponse<TProjectFinance>> {
  async function projectFinanceCreator() {
    return await ProjectFinanceCollection.create({
      project: project.id,
      fund_facility: finance.fund_facility,
      amount: finance.amount,
      statement: finance.statement,
      type: finance.type,
      transaction_fees: finance.transaction_fees || 0,
    });
  }

  const response = await backendRequestOne<TProjectFinance>(projectFinanceCreator);

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.projects,
      response.model.type == ProjectFinanceTypeOptions.donation
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
