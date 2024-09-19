import type { PermissionsGroup } from "../types";

export const payrollPermissions: PermissionsGroup = {
  name: "payroll",
  permissions:  ["read", "pay_employees", "read_history"],
};