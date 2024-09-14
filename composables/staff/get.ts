import { backendRequestMultiple } from "~/app/core/BackendRequest";
import type { TProject } from "../projects/index";
import { ProjectsStaffCollection, type TStaff } from "./index";

export async function getProjectStaff(project: TProject) {
  return await backendRequestMultiple<TStaff>(async () => {
    return await ProjectsStaffCollection.getFullList({
      filter: `project="${project.id}"`,
    });
  });
}
