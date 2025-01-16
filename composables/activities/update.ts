import { backendRequestOne } from "~/app/core/BackendRequest";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { ActivitiesCollection, type TActivity } from ".";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function updateActivity(
  activity: TActivity
): Promise<OneModelResponse<TActivity>> {
  async function activityUpdater() {
    return await ActivitiesCollection.update(activity.id, activity);
  }

  const activityData = await ActivitiesCollection.getOne(activity.id);
  const response = await backendRequestOne<TActivity>(activityUpdater);

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.UPDATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.project_activities,
      UserActivitiesCategoriesOptions.projects,
    ];
    const obj_before = activityData;
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
