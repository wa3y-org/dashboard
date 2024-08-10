export type Permission = string;

export type PermissionsGroup = {
  name: string;
  permissions: Permission[];
};

export type PermissionsSet = {
  name: string;
  groups: PermissionsGroup[];
};
