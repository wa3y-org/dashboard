import type { CollectionModel } from "pocketbase";
import { ActivitiesStaffCollection, ProjectsStaffCollection, type TStaff } from "./index";
import type { TProject } from "../projects/index";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { backendRequestOne } from "~/app/core/BackendRequest";
import type { TActivity } from "../activities";

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

  return await backendRequestOne<TStaff>(activityStaffCreator);
}
