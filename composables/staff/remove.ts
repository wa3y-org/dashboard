import { backendRequestOne } from "~/app/core/BackendRequest";
import { ProjectsStaffCollection, type TStaff } from "./index";

export async function removeStaff(id: string) {
  async function staffRemover() {
    return await ProjectsStaffCollection.delete(id);
  }
  return await backendRequestOne<TStaff>(staffRemover);
}
