import { backendRequestOne } from "~/app/core/BackendRequest";
import { AssetsCollection, type TAsset } from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function removeAsset(asset: TAsset) {
  const assetData = await AssetsCollection.getOne(asset.id);
  const response = await backendRequestOne<TAsset>(async () => {
    return await AssetsCollection.delete(asset.id);
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.assets,
    ];
    const obj_before = assetData;
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
