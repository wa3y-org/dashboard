import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { backendRequestOne } from "~/app/core/BackendRequest";
import { ActivityFinanceCollection, type TActivityFinance } from "./index";

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

  return await backendRequestOne<TActivityFinance>(activityFinanceUpdater);
}
