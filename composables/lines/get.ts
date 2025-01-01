import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";
import { ProjectBudgitlinesCollection, type TProjectBudgetLine } from "./index";

export async function getAllBudgetlines(project_id: string) {
  return await backendRequestMultiple<TProjectBudgetLine>(async () => {
    return await ProjectBudgitlinesCollection.getFullList({
      filter: `
        project="${project_id}"
      `,
    });
  });
}

export async function getOneBudgetline(id: string) {
  return await backendRequestOne<TProjectBudgetLine>(async () => {
    return await ProjectBudgitlinesCollection.getOne(id);
  });
}
