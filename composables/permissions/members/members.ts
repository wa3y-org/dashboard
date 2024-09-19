import type { PermissionsGroup } from "../types";

export const membersPermissions: PermissionsGroup = {
  name: "members",
  permissions:  ["create", "update", "read", "remove"],
};