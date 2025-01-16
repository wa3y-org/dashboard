import { backendRequestOne } from "~/app/core/BackendRequest";
import { PurchasesCollection, type TPurchaseRequest } from "./index";
import { AuthService } from "~/app/modules/users/services";
import {
  FinancialRequestsStatusOptions,
  PurchasesStatusOptions,
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function addPurchaseRequest(
  request: TPurchaseRequest,
  project_id: string
) {
  const response = await backendRequestOne<TPurchaseRequest>(async () => {
    return await PurchasesCollection.create(
      Object.assign(
        {
          status: PurchasesStatusOptions.PENDING,
          project: project_id,
          creator: usePocketBase().authStore.model?.id,
        },
        request
      )
    );
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.projects,
      UserActivitiesCategoriesOptions.expenses,
    ];
    const obj_before = null;
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
