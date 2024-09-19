import type { PermissionsSet } from "../types";
import { assetsPermissions } from "./assets";
import { expensesPermissions } from "./expenses";
import { grantsPermissions } from "./grants";

export const financePermissions: PermissionsSet = {
  name: "Finance",
  groups: [
    assetsPermissions,
    grantsPermissions,
    expensesPermissions,
  ],
};
