import { backendRequestOne } from "~/app/core/BackendRequest";
import { ProjectPurchasesComitiesCollection, type TProjectPurchasesComity } from "./index";

export async function addMember(member: TProjectPurchasesComity, project_id: string) {
  return await backendRequestOne<TProjectPurchasesComity>(async () => {
    return await ProjectPurchasesComitiesCollection.create(Object.assign({ project: project_id }, member));
  });
}
