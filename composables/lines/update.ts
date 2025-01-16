import { backendRequestOne } from "~/app/core/BackendRequest";
import { ProjectBudgitlinesCollection, type TProjectBudgetLine } from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function updateBudgetline(line: TProjectBudgetLine) {
  const lineData = await ProjectBudgitlinesCollection.getOne(line.id);
  const response = await backendRequestOne<TProjectBudgetLine>(async () => {
    return await ProjectBudgitlinesCollection.update(
      line.id,
      Object.assign({}, line)
    );
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.UPDATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.projects,
    ];
    const obj_before = lineData;
    const obj_after = response.model;
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
