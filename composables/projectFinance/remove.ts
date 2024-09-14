import { backendRequestOne } from "~/app/core/BackendRequest";
import { ProjectFinanceCollection, type TProjectFinance } from "./index";

export async function removeFinance(id: string) {
  async function financeRemover() {
    return await ProjectFinanceCollection.delete(id);
  }
  return await backendRequestOne<TProjectFinance>(financeRemover);
}
