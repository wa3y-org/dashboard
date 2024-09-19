import type { PermissionsGroup } from "../types";

export const projectPermissions: PermissionsGroup = {
  name: "projects",
  permissions: ["create", "update", "read", "remove"],
};
