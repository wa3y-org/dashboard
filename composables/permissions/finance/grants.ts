import type { PermissionsGroup } from "../types";

export const grantsPermissions: PermissionsGroup = {
  name: "grants",
  permissions: ["create", "update", "read", "remove"],
};
