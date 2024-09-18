import { FinanceCollection, type TFinance } from "./index";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { backendRequestOne } from "~/app/core/BackendRequest";

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

  return await backendRequestOne<TFinance>(FinanceUpdater);
}
