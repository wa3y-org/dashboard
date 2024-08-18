import type { NavGroup, NavModule } from "../types";
import { employeesRoutes } from "./employees";
import { memberRoutes } from "./members";

const HRModuleChildren: NavGroup[] = [memberRoutes, employeesRoutes];
export const HRModule: NavModule = {
  name: "Human Resources",
  icon: "mdi-account-group-outline",
  route: "/hr",
  permissions: [],
  children: HRModuleChildren,
};
