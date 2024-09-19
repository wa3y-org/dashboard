import type { PermissionsGroup } from "../types";

export const rolesPermissions: PermissionsGroup = {
  name: "roles",
  permissions:  ["create", "update", "read", "remove"],
};