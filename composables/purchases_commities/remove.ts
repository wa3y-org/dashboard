import { backendRequestOne } from "~/app/core/BackendRequest";
import { ProjectPurchasesComitiesCollection, type TProjectPurchasesComity } from "./index";

export async function removeCommityMember(member: TProjectPurchasesComity) {
  return await backendRequestOne<TProjectPurchasesComity>(async () => {
    return await ProjectPurchasesComitiesCollection.delete(member.id);
  });
}
