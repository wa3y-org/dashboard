import type { PermissionsSet } from "../types";
import { rolesPermissions } from "./rolesPermissions";
import { usersPermissions } from "./usersPermissions";

export const systemUsersPermissions: PermissionsSet = {
  name: "users",
  groups: [usersPermissions, rolesPermissions],
};
