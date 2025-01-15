import type { NavGroup, NavModule } from "../types";
import { monitorRoutes } from "./monitor";

const activityMonitorModuleChildren: NavGroup[] = [monitorRoutes];

export const activityMonitorModule: NavModule = {
  name: "Activity Monitor",
  icon: "mdi-monitor-dashboard",
  route: "/activity-monitor",
  permissions: [],
  children: activityMonitorModuleChildren,
};
