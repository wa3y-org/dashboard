import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  FinancialRequestsItemsCollection,
  type TFinancialRequestsItem,
} from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function addFinancialRequestItem(
  item: TFinancialRequestsItem,
  request_id: string
) {
  const response = await backendRequestOne<TFinancialRequestsItem>(async () => {
    return await FinancialRequestsItemsCollection.create(
      Object.assign(
        {
          financial_request: request_id,
        },
        item
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
