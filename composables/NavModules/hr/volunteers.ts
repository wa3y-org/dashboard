import type { NavGroup } from "../types";

export const volunteersRoutes: NavGroup = [
  {
    name: "All Volunteers",
    icon: "mdi-account-circle-outline",
    route: "/hr/volunteers",
    permissions: [],
  },
  {
    name: "Create Volunteer",
    icon: "mdi-account-circle",
    route: "/hr/volunteers/new",
    permissions: [],
  },
];
