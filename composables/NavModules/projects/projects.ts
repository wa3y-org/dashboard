import type { NavGroup } from "../types";

export const projectsRoutes: NavGroup = [
  {
    name: "All Projects",
    icon: "mdi-folder-multiple",
    route: "/projects",
    permissions: [],
  },
  {
    name: "Create Projects",
    icon: "mdi-folder-plus",
    route: "/projects/new",
    permissions: [],
  },
];
