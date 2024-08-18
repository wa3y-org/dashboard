import type { NavGroup } from "../types";

export const employeesRoutes: NavGroup = [
  {
    name: "All Employees",
    icon: "mdi-account-multiple-outline",
    route: "/hr/members",
    permissions: [],
  },
  {
    name: "Create Employee",
    icon: "mdi-account-plus-outline",
    route: "/hr/members/new",
    permissions: [],
  },
];
