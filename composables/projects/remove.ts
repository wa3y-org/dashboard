import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
  type ProjectsRecord,
} from "~/app/pocketbase-types";

export async function removeProject(
  id: string
): Promise<OneModelResponse<ProjectsRecord>> {
  async function projectsRemover() {
    return await usePocketBase().collection("projects").delete(id);
  }

  const Data = await usePocketBase().collection("projects").getOne(id);
  const response = await backendRequestOne<ProjectsRecord>(projectsRemover);
  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.projects,
    ];
    const obj_before = Data;
    const obj_after = null;
    const comment = null;

    useActivityMonitor().create(
      action,
      categories,
      obj_before,
      obj_after,
      comment
    );
  }

  return response;
}
