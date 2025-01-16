import { backendRequestOne } from "~/app/core/BackendRequest";
import { PurchasesCollection, type TPurchaseRequest } from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function updatePurchaseRequest(request: TPurchaseRequest) {
  const Data = await PurchasesCollection.getOne(request.id);
  const response = await backendRequestOne<TPurchaseRequest>(async () => {
    return await PurchasesCollection.update(
      request.id,
      Object.assign({}, request)
    );
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.UPDATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.projects,
      UserActivitiesCategoriesOptions.expenses,
    ];
    const obj_before = Data;
    const obj_after = response.model;
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
