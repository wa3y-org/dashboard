import { backendRequestOne } from "~/app/core/BackendRequest";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import type { ProjectsRecord } from "~/app/pocketbase-types";

export async function createProject(
  project: ProjectsRecord
): Promise<OneModelResponse<ProjectsRecord>> {
  async function projectCreator() {
    return await usePocketBase().collection("projects").create(project);
  }

  return await backendRequestOne<ProjectsRecord>(projectCreator);
}
