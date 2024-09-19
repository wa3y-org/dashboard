import type { PermissionsSet } from "../types";
import { advancesPermissions } from "./advances";
import { payrollPermissions } from "./payroll";
import { salarySettingPermissions } from "./salarySettings";

export const salaryPermissions: PermissionsSet = {
  name: "Salary",
  groups: [
    payrollPermissions,
    advancesPermissions,
    salarySettingPermissions
  ],
};
