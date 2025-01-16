import { backendRequestOne } from "~/app/core/BackendRequest";
import { FinancialRequestsCollection, type TFinancialRequest } from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function updateFinancialRequest(request: TFinancialRequest) {
  const Data = await FinancialRequestsCollection.getOne(request.id);
  const response = await backendRequestOne<TFinancialRequest>(async () => {
    return await FinancialRequestsCollection.update(
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
