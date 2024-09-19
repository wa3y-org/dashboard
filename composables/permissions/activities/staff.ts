import type { PermissionsGroup } from "../types";

export const activityStaffPermissions: PermissionsGroup = {
  name: "activity_staff",
  permissions: ["create", "update", "read", "remove"],
};
