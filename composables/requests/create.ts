import { backendRequestOne } from "~/app/core/BackendRequest";
import { FinancialRequestsCollection, type TFinancialRequest } from "./index";
import { AuthService } from "~/app/modules/users/services";
import {
  FinancialRequestsStatusOptions,
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function addFinancialRequest(
  request: TFinancialRequest,
  project_id: string
) {
  const response = await backendRequestOne<TFinancialRequest>(async () => {
    return await FinancialRequestsCollection.create(
      Object.assign(
        {
          status: FinancialRequestsStatusOptions.PENDING,
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
