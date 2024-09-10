import { backendRequestMultiple } from "~/app/core/BackendRequest";
import type { MultipleModelsResponse } from "~/app/core/CRUDRepository";
import type { ProjectsRecord } from "~/app/pocketbase-types";

export async function getAll(): Promise<
  MultipleModelsResponse<ProjectsRecord>
> {
  async function projectsFetcher() {
    return await usePocketBase().collection("projects").getFullList({
      sort: "-created",
    });
  }
  return await backendRequestMultiple<ProjectsRecord>(projectsFetcher);
}
