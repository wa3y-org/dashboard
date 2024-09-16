import type { BaseModel, RecordModel } from "pocketbase";
import type { AssetsRecord, AssetsResponse } from "~/app/pocketbase-types";

export type TAsset = AssetsRecord & AssetsResponse & RecordModel & BaseModel;

export const AssetsCollection = usePocketBase().collection('assets')

// export async function addAsset(
//   asset: TAsset,
// ) {
//   return await backendRequestOne<TAsset>(async () => {
//     return await AssetsCollection.create({
      
//     });
//   });
// }