import { backendRequestOne } from "~/app/core/BackendRequest";
import { PurchasesCollection, type TPurchaseRequest } from "./index";

export async function removePurchaseRequest(request: TPurchaseRequest) {
  return await backendRequestOne<TPurchaseRequest>(async () => {
    return await PurchasesCollection.delete(request.id);
  });
}
