import type { PermissionsSet } from "../types";
import { activityFinancePermissions } from "./finance";
import { activityPermissions } from "./activity";
import { activityStaffPermissions } from "./staff";
import { activityTimelinePermissions } from "./timeline";

export const activitiesPermissions: PermissionsSet = {
  name: "activities",
  groups: [
    activityPermissions,
    activityTimelinePermissions,
    activityStaffPermissions,
    activityFinancePermissions,
  ],
};
