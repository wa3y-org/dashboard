import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  ActivitiesStaffCollection,
  ProjectsStaffCollection,
  type TStaff,
} from "./index";

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
  return await backendRequestOne<TStaff>(staffRemover);
}
