import { backendRequestOne } from "~/app/core/BackendRequest";
import { UserActivitiesCollection, type TUserActivity } from "./index";
import type {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function setUserActivity(
  action: UserActivitiesActionOptions,
  categories: UserActivitiesCategoriesOptions[] = [],
  obj_before: Object | null = null,
  obj_after: Object | null = null,
  comment: string | null =  null,
) {
  return await backendRequestOne<TUserActivity>(async () => {
    return await UserActivitiesCollection.create({
      employee: usePocketBase().authStore.model?.id || "",
      action: action,
      categories: categories,
      obj_before: obj_before,
      obj_after: obj_after,
      comment: comment,
    });
  });
}
