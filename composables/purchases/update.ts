import { backendRequestOne } from "~/app/core/BackendRequest";
import { PurchasesCollection, type TPurchaseRequest } from "./index";

export async function updatePurchaseRequest(request: TPurchaseRequest) {
  return await backendRequestOne<TPurchaseRequest>(async () => {
    return await PurchasesCollection.update(request.id, Object.assign({}, request));
  });
}
