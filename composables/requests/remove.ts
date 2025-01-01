import { backendRequestOne } from "~/app/core/BackendRequest";
import { FinancialRequestsCollection, type TFinancialRequest } from "./index";

export async function removeFinancialRequest(request: TFinancialRequest) {
  return await backendRequestOne<TFinancialRequest>(async () => {
    return await FinancialRequestsCollection.delete(request.id);
  });
}
