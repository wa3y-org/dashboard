import type { PermissionsGroup } from "../types";

export const grantsPermissions: PermissionsGroup = {
  name: "donations",
  permissions: ["create", "update", "read", "remove"],
};
