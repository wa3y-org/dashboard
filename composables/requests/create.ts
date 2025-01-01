import { backendRequestOne } from "~/app/core/BackendRequest";
import { FinancialRequestsCollection, type TFinancialRequest } from "./index";
import { AuthService } from "~/app/modules/users/services";
import { FinancialRequestsStatusOptions } from "~/app/pocketbase-types";

export async function addFinancialRequest(request: TFinancialRequest, project_id: string) {
  return await backendRequestOne<TFinancialRequest>(async () => {
    return await FinancialRequestsCollection.create(Object.assign(
      {
        status: FinancialRequestsStatusOptions.PENDING,
        project: project_id,
        creator: usePocketBase().authStore.model?.id
      }, request)
    );
  });
}
