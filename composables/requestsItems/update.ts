import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  FinancialRequestsItemsCollection,
  type TFinancialRequestsItem,
} from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function updateItem(item: TFinancialRequestsItem) {
  const Data = await FinancialRequestsItemsCollection.getOne(item.id);
  const response = await backendRequestOne<TFinancialRequestsItem>(async () => {
    return await FinancialRequestsItemsCollection.update(
      item.id,
      Object.assign({}, item)
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
