import { backendRequestOne } from "~/app/core/BackendRequest";
import { AssetsCollection, type TAsset } from "./index";

export async function addAsset(asset: TAsset) {
  return await backendRequestOne<TAsset>(async () => {
    return await AssetsCollection.create(Object.assign({}, asset));
  });
}
