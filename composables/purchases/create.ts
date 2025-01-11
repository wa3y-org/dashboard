import { backendRequestOne } from "~/app/core/BackendRequest";
import { PurchasesCollection, type TPurchaseRequest } from "./index";
import { AuthService } from "~/app/modules/users/services";
import { FinancialRequestsStatusOptions, PurchasesStatusOptions } from "~/app/pocketbase-types";

export async function addPurchaseRequest(request: TPurchaseRequest, project_id: string) {
  return await backendRequestOne<TPurchaseRequest>(async () => {
    return await PurchasesCollection.create(Object.assign(
      {
        status: PurchasesStatusOptions.PENDING,
        project: project_id,
        creator: usePocketBase().authStore.model?.id
      }, request)
    );
  });
}
