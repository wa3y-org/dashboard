import { backendRequestOne } from "~/app/core/BackendRequest";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { ActivitiesCollection, type TActivity } from ".";

export async function updateActivity(
  activity: TActivity
): Promise<OneModelResponse<TActivity>> {
  async function activityUpdater() {
    return await ActivitiesCollection.update(activity.id, activity);
  }

  return await backendRequestOne<TActivity>(activityUpdater);
}
