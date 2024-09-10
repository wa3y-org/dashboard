import { backendRequestMultiple } from "~/app/core/BackendRequest";
import type { MultipleModelsResponse } from "~/app/core/CRUDRepository";
import type { ProjectsRecord } from "~/app/pocketbase-types";

export async function getAll(
  fields: string = "*,details:excerpt(1,true)"
): Promise<MultipleModelsResponse<ProjectsRecord>> {
  async function projectsFetcher() {
    return await usePocketBase().collection("projects").getFullList({
      sort: "-created",
      fields: fields,
    });
  }
  return await backendRequestMultiple<ProjectsRecord>(projectsFetcher);
}
