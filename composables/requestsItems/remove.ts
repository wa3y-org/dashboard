import { backendRequestOne } from "~/app/core/BackendRequest";
import { FinancialRequestsItemsCollection, type TFinancialRequestsItem } from "./index";

export async function removeItem(item: TFinancialRequestsItem) {
  return await backendRequestOne<TFinancialRequestsItem>(async () => {
    return await FinancialRequestsItemsCollection.delete(item.id);
  });
}
