import { backendRequestOne } from "~/app/core/BackendRequest";
import { AssetsCollection, type TAsset } from "./index";

export async function removeAsset(asset: TAsset) {
  return await backendRequestOne<TAsset>(async () => {
    return await AssetsCollection.delete(asset.id);
  });
}
