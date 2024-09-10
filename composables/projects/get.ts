import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";
import type {
  MultipleModelsResponse,
  OneModelResponse,
} from "~/app/core/CRUDRepository";
import type { ProjectsRecord } from "~/app/pocketbase-types";

const pb = usePocketBase();


export async function getAll(
  fields: string = "*,details:excerpt(1,true)"
): Promise<MultipleModelsResponse<ProjectsRecord>> {
  async function projectsFetcher() {
    return await pb.collection("projects").getFullList({
      sort: "-created",
      fields: fields,
    });
  }
  return await backendRequestMultiple<ProjectsRecord>(projectsFetcher);
}

export async function getOne(
  id: string
): Promise<OneModelResponse<ProjectsRecord>> {
  async function projectsFetcher() {
    return await pb.collection("projects").getOne(id);
  }
  return await backendRequestOne<ProjectsRecord>(projectsFetcher);
}
