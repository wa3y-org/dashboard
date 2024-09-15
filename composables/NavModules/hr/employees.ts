import type { NavGroup } from "../types";

export const employeesRoutes: NavGroup = [
  {
    name: "All Employees",
    icon: "mdi-account-multiple-outline",
    route: "/hr/employees",
    permissions: [],
  },
  {
    name: "Create Employee",
    icon: "mdi-account-plus-outline",
    route: "/hr/employees/new",
    permissions: [],
  },
  
];
