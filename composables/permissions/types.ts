import type { Permission } from "~/app/modules/users/domain/models/Permissions";

export type PermissionsGroup = {
  name: string;
  permissions: Permission[];
};

export type PermissionsSet = {
  name: string;
  groups: PermissionsGroup[];
};
