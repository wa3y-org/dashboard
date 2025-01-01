import { backendRequestOne } from "~/app/core/BackendRequest";
import { ProjectBudgitlinesCollection, type TProjectBudgetLine } from "./index";

export async function addBudgetline(line: TProjectBudgetLine, project_id: string) {
  return await backendRequestOne<TProjectBudgetLine>(async () => {
    return await ProjectBudgitlinesCollection.create(Object.assign({ project: project_id }, line));
  });
}
