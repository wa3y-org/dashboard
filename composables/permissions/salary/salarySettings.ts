import type { PermissionsGroup } from "../types";

export const salarySettingPermissions: PermissionsGroup = {
  name: "salary_setting",
  permissions:  ["create", "update", "read", "remove"],
};