import type { PermissionsGroup } from "../types";

export const projectStaffPermissions: PermissionsGroup = {
  name: "project_staff",
  permissions: ["create", "update", "read", "remove"],
};
