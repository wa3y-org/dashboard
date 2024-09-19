import type { PermissionsGroup } from "../types";

export const expensesPermissions: PermissionsGroup = {
  name: "expenses",
  permissions: ["create", "update", "read", "remove"],
};
