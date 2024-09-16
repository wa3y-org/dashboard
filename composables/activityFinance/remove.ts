import { backendRequestOne } from "~/app/core/BackendRequest";
import { ActivityFinanceCollection, type TActivityFinance } from "./index";

export async function removeFinance(id: string) {
  async function financeRemover() {
    return await ActivityFinanceCollection.delete(id);
  }
  return await backendRequestOne<TActivityFinance>(financeRemover);
}
