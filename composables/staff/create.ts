import type { CollectionModel } from "pocketbase";
import {
  ActivitiesStaffCollection,
  ProjectsStaffCollection,
  type TStaff,
} from "./index";
import type { TProject } from "../projects/index";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { backendRequestOne } from "~/app/core/BackendRequest";
import type { TActivity } from "../activities";
import { UserActivitiesActionOptions, UserActivitiesCategoriesOptions } from "~/app/pocketbase-types";

export async function addProjectStaff(
  project: TProject,
  staff: TStaff
): Promise<OneModelResponse<TStaff>> {
  async function projectStaffCreator() {
    return await ProjectsStaffCollection.create({
      project: project.id,
      position: staff.position,
      description: staff.description,
      type: staff.type,
      person_id: staff.person.id,
    });
  }

  return await backendRequestOne<TStaff>(projectStaffCreator);
}

export async function addActivityStaff(
  activity: TActivity,
  staff: TStaff
): Promise<OneModelResponse<TStaff>> {
  async function activityStaffCreator() {
    return await ActivitiesStaffCollection.create({
      activity: activity.id,
      position: staff.position,
      description: staff.description,
      type: staff.type,
      person_id: staff.person.id,
    });
  }

  const response = await backendRequestOne<TStaff>(activityStaffCreator);

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.projects,
      UserActivitiesCategoriesOptions.project_activities,
      UserActivitiesCategoriesOptions.hr,
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
