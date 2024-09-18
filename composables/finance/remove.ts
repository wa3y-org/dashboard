import { backendRequestOne } from "~/app/core/BackendRequest";
import { FinanceCollection, type TFinance } from "./index";

export async function removeFinance(id: string) {
  async function financeRemover() {
    return await FinanceCollection.delete(id);
  }
  return await backendRequestOne<TFinance>(financeRemover);
}
