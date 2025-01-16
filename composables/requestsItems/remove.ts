import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  FinancialRequestsItemsCollection,
  type TFinancialRequestsItem,
} from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";
import { updateItem } from "./update";

export async function removeItem(item: TFinancialRequestsItem) {
  const Data = await FinancialRequestsItemsCollection.getOne(item.id);
  const response = await backendRequestOne<TFinancialRequestsItem>(async () => {
    return await FinancialRequestsItemsCollection.delete(item.id);
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

export async function removeItemBill(
  item: TFinancialRequestsItem,
  bill: string
) {
  return await updateItem({
    id: item.id,
    "bills-": bill,
  });

  
}
