import { backendRequestOne } from "~/app/core/BackendRequest";
import { FinancialRequestsCollection, type TFinancialRequest } from "./index";

export async function updateFinancialRequest(request: TFinancialRequest) {
  return await backendRequestOne<TFinancialRequest>(async () => {
    return await FinancialRequestsCollection.update(request.id, Object.assign({}, request));
  });
}
