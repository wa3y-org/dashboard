import { backendRequestOne } from "~/app/core/BackendRequest";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { ActivitiesCollection, type TActivity } from ".";

export async function removeActivity(
  id: string
): Promise<OneModelResponse<TActivity>> {
  async function activityRemover() {
    return await ActivitiesCollection.delete(id);
  }
  return await backendRequestOne<TActivity>(activityRemover);
}
