import type { NavGroup } from "../types";

export const memberRoutes: NavGroup = [
  {
    name: "List Members",
    icon: "mdi-account-box-multiple-outline",
    route: "/hr/members",
    permissions: [],
  },
  {
    name: "Create Member",
    icon: "mdi-account-box-plus-outline",
    route: "/hr/members/new",
    permissions: [],
  },
];
