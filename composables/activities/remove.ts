import { backendRequestOne } from "~/app/core/BackendRequest";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { ActivitiesCollection, type TActivity } from ".";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function removeActivity(
  id: string
): Promise<OneModelResponse<TActivity>> {
  async function activityRemover() {
    return await ActivitiesCollection.delete(id);
  }

  const activity = await ActivitiesCollection.getOne(id);
  const response = await backendRequestOne<TActivity>(activityRemover);

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.project_activities,
      UserActivitiesCategoriesOptions.projects,
    ];
    const obj_before = activity;
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
