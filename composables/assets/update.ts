import { backendRequestOne } from "~/app/core/BackendRequest";
import { AssetsCollection, type TAsset } from "./index";

export async function updateAsset(asset: TAsset) {
  return await backendRequestOne<TAsset>(async () => {
    return await AssetsCollection.update(asset.id, Object.assign({}, asset));
  });
}
