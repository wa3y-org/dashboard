import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  ActivitiesStaffCollection,
  ProjectsStaffCollection,
  type TStaff,
} from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function removeStaff(id: string) {
  async function staffRemover() {
    return await ProjectsStaffCollection.delete(id);
  }
  return await backendRequestOne<TStaff>(staffRemover);
}

export async function removeActivityStaff(id: string) {
  async function staffRemover() {
    return await ActivitiesStaffCollection.delete(id);
  }

  const Data = await ActivitiesStaffCollection.getOne(id);
  const response = await backendRequestOne<TStaff>(staffRemover);

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.projects,
      UserActivitiesCategoriesOptions.project_activities,
      UserActivitiesCategoriesOptions.hr,
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
