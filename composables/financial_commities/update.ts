import { backendRequestOne } from "~/app/core/BackendRequest";
import { ProjectFinancialCommitiesCollection, type TProjectFinancialCommity } from "./index";

export async function updateMember(member: TProjectFinancialCommity) {
  return await backendRequestOne<TProjectFinancialCommity>(async () => {
    return await ProjectFinancialCommitiesCollection.update(member.id, Object.assign({}, member));
  });
}
