import { backendRequestOne } from "~/app/core/BackendRequest";
import { ProjectBudgitlinesCollection, type TProjectBudgetLine } from "./index";
import { UserActivitiesActionOptions, UserActivitiesCategoriesOptions } from "~/app/pocketbase-types";

export async function removeBudgetline(line: TProjectBudgetLine) {
  const lineData = await ProjectBudgitlinesCollection.getOne(line.id);
  const response = await backendRequestOne<TProjectBudgetLine>(async () => {
    return await ProjectBudgitlinesCollection.delete(line.id);
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.projects,
    ];
    const obj_before = line;
    const obj_after = null;
    const comment = null;

    useActivityMonitor().create(
      action,
      categories,
      obj_before,
      obj_after,
      comment
    );
  }

  return response;
}
