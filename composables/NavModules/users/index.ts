import type { NavGroup, NavModule } from "../types";

export const userRoutes: NavGroup = [
  {
    name: "Create New User",
    icon: "mdi-account-plus-outline",
    route: "/users/new",
    permissions: [],
  },
  {
    name: "All User",
    icon: "mdi-account-multiple-outline",
    route: "/users",
    permissions: [],
  },
];
export const rolesRoutes: NavGroup = [
  
  {
    name: "All Roles",
    icon: "mdi-tag-multiple",
    route: "/users/roles",
    permissions: [],
  },
  {
    name: "Create Role",
    icon: "mdi-tag-plus",
    route: "/users/roles/new",
    permissions: [],
  },
];

const UsersModuleNavGroups: NavGroup[] = [/*userRoutes,*/ rolesRoutes];

export const UsersModule: NavModule = {
  name: "System Users",
  icon: "mdi-shield-account-outline",
  route: "/users/dashboard",
  permissions: [],
  children: UsersModuleNavGroups,
};
