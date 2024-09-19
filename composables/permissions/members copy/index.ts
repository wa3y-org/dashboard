import type { PermissionsSet } from "../types";
import { membersPermissions } from "./members";


export const orgMembersPermissions: PermissionsSet = {
  name: "Members",
  groups: [membersPermissions],
};
