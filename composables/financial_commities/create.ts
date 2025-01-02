import { backendRequestOne } from "~/app/core/BackendRequest";
import { ProjectFinancialCommitiesCollection, type TProjectFinancialCommity } from "./index";

export async function addMember(member: TProjectFinancialCommity, project_id: string) {
  return await backendRequestOne<TProjectFinancialCommity>(async () => {
    return await ProjectFinancialCommitiesCollection.create(Object.assign({ project: project_id }, member));
  });
}
