import type { PermissionsGroup } from "../types";

export const usersPermissions: PermissionsGroup = {
  name: "users",
  permissions: ["create", "update", "read", "remove"],
};