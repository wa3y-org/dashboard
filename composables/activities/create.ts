import { backendRequestOne } from "~/app/core/BackendRequest";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { ActivitiesCollection, type TActivity } from ".";

export async function createActivity(
  activity: TActivity
): Promise<OneModelResponse<TActivity>> {
  async function activityCreator() {
    return await ActivitiesCollection.create(activity);
  }

  return await backendRequestOne<TActivity>(activityCreator);
}
