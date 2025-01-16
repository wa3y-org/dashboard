import type { CollectionModel } from "pocketbase";
import {
  ActivitiesStaffCollection,
  ProjectsStaffCollection,
  type TStaff,
} from "./index";
import type { TProject } from "../projects/index";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function updateStaff(
  staff: TStaff
): Promise<OneModelResponse<TStaff>> {
  async function staffUpdater() {
    return await ProjectsStaffCollection.update(staff.id, {
      position: staff.position,
      description: staff.description,
      type: staff.type,
      person_id: staff.person.id,
    });
  }

  return await backendRequestOne<TStaff>(staffUpdater);
}

export async function updateActivityStaff(
  staff: TStaff
): Promise<OneModelResponse<TStaff>> {
  async function staffUpdater() {
    return await ActivitiesStaffCollection.update(staff.id, {
      position: staff.position,
      description: staff.description,
      type: staff.type,
      person_id: staff.person.id,
    });
  }

  const Data = await ActivitiesStaffCollection.getOne(staff.id);
  const response = await backendRequestOne<TStaff>(staffUpdater);

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.UPDATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.projects,
      UserActivitiesCategoriesOptions.project_activities,
      UserActivitiesCategoriesOptions.hr,
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
