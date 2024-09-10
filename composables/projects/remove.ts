import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import type { ProjectsRecord } from "~/app/pocketbase-types";

export async function removeProject(
  id: string
): Promise<OneModelResponse<ProjectsRecord>> {
  async function projectsRemover() {
    return await usePocketBase().collection("projects").delete(id);
  }
  return await backendRequestOne<ProjectsRecord>(projectsRemover);
}
