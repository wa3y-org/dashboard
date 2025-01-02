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
  project_id: string,
  fields: string = "*,description:excerpt(1,true)"
): Promise<MultipleModelsResponse<TActivity>> {
  async function activitiesFetcher() {
    return await ActivitiesCollection.getFullList({
      sort: "-created",
      fields: fields,
      filter: `
        project="${project_id}"
      `,
    });
  }
  return await backendRequestMultiple<TActivity>(activitiesFetcher);
}

export async function getOneActivity(
  id: string
): Promise<OneModelResponse<TActivity>> {
  async function activitiesFetcher() {
    return await ActivitiesCollection.getOne(id, {
      expand: 'project'
    });
  }
  return await backendRequestOne<TActivity>(activitiesFetcher);
}
