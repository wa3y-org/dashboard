import { backendRequestOne } from "~/app/core/BackendRequest";
import { ProjectBudgitlinesCollection, type TProjectBudgetLine } from "./index";

export async function updateBudgetline(line: TProjectBudgetLine) {
  return await backendRequestOne<TProjectBudgetLine>(async () => {
    return await ProjectBudgitlinesCollection.update(line.id, Object.assign({}, line));
  });
}
