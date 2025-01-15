import type { NavGroup } from "../types";

export const monitorRoutes: NavGroup = [
  {
    name: "All Operations",
    icon: "mdi-monitor",
    route: "/activity-monitor/all",
    permissions: [],
  },
  {
    name: "HR",
    icon: "mdi-monitor-account",
    route: "/activity-monitor/hr",
    permissions: [],
  },
  {
    name: "Projects",
    icon: "mdi-monitor-star",
    route: "/activity-monitor/projects",
    permissions: [],
  },
  {
    name: "Finance",
    icon: "mdi-monitor-eye",
    route: "/activity-monitor/finance",
    permissions: [],
  },
  {
    name: "Website",
    icon: "mdi-monitor-edit",
    route: "/activity-monitor/website",
    permissions: [],
  },
];
