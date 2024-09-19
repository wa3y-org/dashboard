import type { PermissionsSet } from "../types";
import { projectFinancePermissions } from "./finance";
import { projectPermissions } from "./projects";
import { projectStaffPermissions } from "./staff";
import { projectTimelinePermissions } from "./timline";

export const projectsPermissions: PermissionsSet = {
  name: "projects",
  groups: [
    projectPermissions,
    projectTimelinePermissions,
    projectStaffPermissions,
    projectFinancePermissions,
  ],
};
