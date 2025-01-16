import { backendRequestOne } from "~/app/core/BackendRequest";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
  type ProjectsRecord,
} from "~/app/pocketbase-types";

export async function createProject(
  project: ProjectsRecord
): Promise<OneModelResponse<ProjectsRecord>> {
  async function projectCreator() {
    return await usePocketBase().collection("projects").create(project);
  }

  const response = await backendRequestOne<ProjectsRecord>(projectCreator);

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.projects,
    ];
    const obj_before = null;
    const obj_after = response.model;
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
