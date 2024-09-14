import type { CollectionModel } from "pocketbase";
import { ProjectFinanceCollection, type TProjectFinance } from "./index";
import type { TProject } from "../projects/index";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { backendRequestOne } from "~/app/core/BackendRequest";

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
    });
  }


  return await backendRequestOne<TProjectFinance>(projectFinanceCreator);
}
