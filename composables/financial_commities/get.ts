import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";
import { ProjectFinancialCommitiesCollection, type TProjectFinancialCommity } from "./index";

export async function getAllCommityMembers(project_id: string) {
  return await backendRequestMultiple<TProjectFinancialCommity>(async () => {
    return await ProjectFinancialCommitiesCollection.getFullList({
      filter: `
        project="${project_id}"
      `,
      expand: "project, employee"
    });
  });
}

export async function getOneCommityMember(id: string) {
  return await backendRequestOne<TProjectFinancialCommity>(async () => {
    return await ProjectFinancialCommitiesCollection.getOne(id, {
      expand: "project, employee"
    });
  });
}
