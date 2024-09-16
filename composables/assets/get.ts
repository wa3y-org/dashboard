import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";
import { AssetsCollection, type TAsset } from "./index";

export async function getAllAssets() {
  return await backendRequestMultiple<TAsset>(async () => {
    return await AssetsCollection.getFullList({
      sort: "-created",
    });
  });
}

export async function getOneAsset(id: string) {
  return await backendRequestOne<TAsset>(async () => {
    return await AssetsCollection.getOne(id);
  });
}
