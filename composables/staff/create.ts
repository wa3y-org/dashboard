import type { CollectionModel } from "pocketbase";
import { ProjectsStaffCollection, type TStaff } from "./index";
import type { TProject } from "../projects/index";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { backendRequestOne } from "~/app/core/BackendRequest";

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
