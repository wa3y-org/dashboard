import { backendRequestOne } from "~/app/core/BackendRequest";
import { ProjectBudgitlinesCollection, type TProjectBudgetLine } from "./index";

export async function removeBudgetline(line: TProjectBudgetLine) {
  return await backendRequestOne<TProjectBudgetLine>(async () => {
    return await ProjectBudgitlinesCollection.delete(line.id);
  });
}
