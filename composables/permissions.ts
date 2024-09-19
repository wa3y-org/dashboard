import type { Permission } from "~/app/modules/users/domain/models/Permissions";
import type { PermissionsGroup, PermissionsSet } from "./permissions/types";
import { systemUsersPermissions } from "./permissions/users";
import { financePermissions } from "./permissions/finance";
import { salaryPermissions } from "./permissions/salary";
import { orgMembersPermissions } from "./permissions/members";
import { orgEmployeesPermissions } from "./permissions/employees";
import { projectsPermissions } from "./permissions/projects";
import { activitiesPermissions } from "./permissions/activities";

const systemPermissions: PermissionsSet[] = [
  financePermissions,
  salaryPermissions,
  orgMembersPermissions,
  orgEmployeesPermissions,
  projectsPermissions,
  activitiesPermissions,
  systemUsersPermissions,
];

// permission name making strategy
const groupPermissionSeparator = ".";

// make permission name by combining it with the group name separated with configured separator
function makePermissionName(
  group: PermissionsGroup,
  permission: Permission
): Permission {
  return group.name + groupPermissionSeparator + permission;
}

export function usePermissionsController() {
  // granted permission for the new role
  const grantedPermissions: Ref<Set<Permission>> = ref(new Set<Permission>());

  // check if permission is granted
  function isGranted(group: PermissionsGroup, permission: Permission) {
    const permissionName = makePermissionName(group, permission);
    return grantedPermissions.value.has(permissionName);
  }

  // grants new permission form the name of the group
  function grant(group: PermissionsGroup, permission: Permission) {
    const permissionName = makePermissionName(group, permission);

    grantedPermissions.value.add(permissionName);
  }

  // removes a granted permission
  function deny(group: PermissionsGroup, permission: Permission) {
    const permissionName = makePermissionName(group, permission);

    grantedPermissions.value.delete(permissionName);
  }

  // grant if not granted and deny if granted
  function togglePermission(group: PermissionsGroup, permission: Permission) {
    if (isGranted(group, permission)) {
      return deny(group, permission);
    }
    return grant(group, permission);
  }

  // counts the permissions granted from the given set
  function countPermissionsSetGrantedPermissions(
    permissionsSet: PermissionsSet
  ): number {
    let count = 0;
    for (let group of permissionsSet.groups) {
      for (let permission of group.permissions) {
        if (isGranted(group, permission)) count++;
      }
    }
    return count;
  }

  return {
    grantedPermissions,
    isGranted,
    grant,
    deny,
    togglePermission,
    systemPermissions,
    countPermissionsSetGrantedPermissions,
  };
}
