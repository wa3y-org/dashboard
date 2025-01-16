import { backendRequestOne } from "~/app/core/BackendRequest";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
  type ProjectsRecord,
} from "~/app/pocketbase-types";

export async function updateProject(
  project: ProjectsRecord
): Promise<OneModelResponse<ProjectsRecord>> {
  async function projectUpdate() {
    return await usePocketBase()
      .collection("projects")
      .update(project.id, project);
  }

  const Data = await usePocketBase().collection("projects").getOne(project.id);
  const response = await backendRequestOne<ProjectsRecord>(projectUpdate);
  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.UPDATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.projects,
    ];
    const obj_before = Data;
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
