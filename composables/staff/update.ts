import type { CollectionModel } from "pocketbase";
import { ProjectsStaffCollection, type TStaff } from "./index";
import type { TProject } from "../projects/index";
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { backendRequestOne } from "~/app/core/BackendRequest";

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
