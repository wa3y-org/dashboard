import { backendRequestOne } from "~/app/core/BackendRequest";
import { ProjectFinancialCommitiesCollection, type TProjectFinancialCommity } from "./index";

export async function removeCommityMember(member: TProjectFinancialCommity) {
  return await backendRequestOne<TProjectFinancialCommity>(async () => {
    return await ProjectFinancialCommitiesCollection.delete(member.id);
  });
}
