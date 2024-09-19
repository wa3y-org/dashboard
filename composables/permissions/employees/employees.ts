import type { PermissionsGroup } from "../types";

export const employeesPermissions: PermissionsGroup = {
  name: "employees",
  permissions: [
    "create",
    "update",
    "read",
    "remove",
    "read_salary",
    "read_auth",
  ],
};
