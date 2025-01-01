import { backendRequestOne } from "~/app/core/BackendRequest";
import { FinancialRequestsItemsCollection, type TFinancialRequestsItem } from "./index";

export async function addFinancialRequestItem(item: TFinancialRequestsItem, request_id: string) {
  console.log(item); alert();
  return await backendRequestOne<TFinancialRequestsItem>(async () => {
    return await FinancialRequestsItemsCollection.create(Object.assign(
      {
        financial_request: request_id
      }, item)
    );
  });
}
