import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";
import { ProjectPurchasesComitiesCollection, type TProjectPurchasesComity } from "./index";

export async function getAllCommityMembers(project_id: string) {
  return await backendRequestMultiple<TProjectPurchasesComity>(async () => {
    return await ProjectPurchasesComitiesCollection.getFullList({
      filter: `
        project="${project_id}"
      `,
      expand: "project, employee"
    });
  });
}

export async function getOneCommityMember(id: string) {
  return await backendRequestOne<TProjectPurchasesComity>(async () => {
    return await ProjectPurchasesComitiesCollection.getOne(id, {
      expand: "project, employee"
    });
  });
}
