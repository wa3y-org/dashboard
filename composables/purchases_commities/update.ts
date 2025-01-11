import { backendRequestOne } from "~/app/core/BackendRequest";
import { ProjectPurchasesComitiesCollection, type TProjectPurchasesComity } from "./index";

export async function updateMember(member: TProjectPurchasesComity) {
  return await backendRequestOne<TProjectPurchasesComity>(async () => {
    return await ProjectPurchasesComitiesCollection.update(member.id, Object.assign({}, member));
  });
}
