import { backendRequestOne } from "~/app/core/BackendRequest";
import { PurchasesCollection, type TPurchaseRequest } from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";
import { updatePurchaseRequest } from "./update";

export async function removePurchaseRequest(request: TPurchaseRequest) {
  const Data = await PurchasesCollection.getOne(request.id);
  const response = await backendRequestOne<TPurchaseRequest>(async () => {
    return await PurchasesCollection.delete(request.id);
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.projects,
      UserActivitiesCategoriesOptions.expenses,
    ];
    const obj_before = Data;
    const obj_after = null;
    const comment = null;

    useActivityMonitor().create(
      action,
      categories,
      obj_before,
      obj_after,
      comment
    );
  }

  return response;
}

export async function removePurchaseRequestBill(
  request: TPurchaseRequest,
  bill: string
) {
  return await updatePurchaseRequest({
    id: request.id,
    "bills-": bill,
  });
}
