import { ProjectFinanceCollection, type TProjectFinance } from "./index";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { backendRequestOne } from "~/app/core/BackendRequest";

export async function updateProjectFinance(
  finance: TProjectFinance
): Promise<OneModelResponse<TProjectFinance>> {
  console.log(finance)
  async function projectFinanceUpdater() {
    return await ProjectFinanceCollection.update(finance.id, {
      fund_facility: finance.fund_facility,
      amount: finance.amount,
      statement: finance.statement,
      transaction_fees: finance.transaction_fees,
    });
  }

  return await backendRequestOne<TProjectFinance>(projectFinanceUpdater);
}
