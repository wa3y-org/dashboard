import { backendRequestMultiple } from "~/app/core/BackendRequest";
import type { TProject } from "../projects/index";
import {
  ActivitiesStaffCollection,
  ProjectsStaffCollection,
  type TStaff,
} from "./index";
import type { TActivity } from "../activities";
import { EmployeesCollection } from "../employees/index";

export async function getProjectStaff(project: TProject) {
  return await backendRequestMultiple<TStaff>(async () => {
    return await ProjectsStaffCollection.getFullList({
      filter: `project="${project.id}"`,
    });
  });
}

export async function getActivityStaff(activity: TActivity) {
  return await backendRequestMultiple<TStaff>(async () => {
    return await ActivitiesStaffCollection.getFullList({
      filter: `activity="${activity.id}"`,
    });
  });
}

export async function getProjectEmployees(project: TProject) {
  return await backendRequestMultiple<TStaff>(async () => {
    return await EmployeesCollection.getFullList({
      filter: `project="${project.id}"`,
    });
  });
}
