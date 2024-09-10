import { backendRequestOne } from "~/app/core/BackendRequest";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import type { ProjectsRecord } from "~/app/pocketbase-types";

export async function updateProject(
  project: ProjectsRecord
): Promise<OneModelResponse<ProjectsRecord>> {
  async function projectUpdate() {
    return await usePocketBase()
      .collection("projects")
      .update(project.id, project);
  }

  return await backendRequestOne<ProjectsRecord>(projectUpdate);
}
