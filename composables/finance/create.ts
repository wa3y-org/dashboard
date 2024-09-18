import { FinanceCollection, type TFinance } from "./index";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { backendRequestOne } from "~/app/core/BackendRequest";

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

  return await backendRequestOne<TFinance>(financeCreator);
}
