import type {
  MultipleModelsResponse,
  OneModelResponse,
} from "~/app/core/CRUDRepository";
import { ActivitiesCollection, type TActivity } from ".";
import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";

export async function getAllActivities(
  fields: string = "*,description:excerpt(1,true)"
): Promise<MultipleModelsResponse<TActivity>> {
  async function activitiesFetcher() {
    return await ActivitiesCollection.getFullList({
      sort: "-created",
      fields: fields,
    });
  }
  return await backendRequestMultiple<TActivity>(activitiesFetcher);
}

export async function getOneActivity(
  id: string
): Promise<OneModelResponse<TActivity>> {
  async function activitiesFetcher() {
    return await ActivitiesCollection.getOne(id);
  }
  return await backendRequestOne<TActivity>(activitiesFetcher);
}
