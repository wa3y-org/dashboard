import { backendRequestOne } from "~/app/core/BackendRequest";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { ActivitiesCollection, type TActivity } from ".";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function createActivity(
  activity: TActivity
): Promise<OneModelResponse<TActivity>> {
  async function activityCreator() {
    return await ActivitiesCollection.create(activity);
  }

  const response = await backendRequestOne<TActivity>(activityCreator);
  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.project_activities,
      UserActivitiesCategoriesOptions.projects,
    ];
    const obj_before = null;
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
