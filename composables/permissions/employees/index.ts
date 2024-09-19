import type { PermissionsSet } from "../types";
import { employeesPermissions } from "./employees";

export const orgEmployeesPermissions: PermissionsSet = {
  name: "Employees",
  groups: [employeesPermissions],
};
