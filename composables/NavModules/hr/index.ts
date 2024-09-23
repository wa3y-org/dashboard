import type { NavGroup, NavModule } from "../types";
import { rolesRoutes, userRoutes } from "../users";
import { employeesRoutes } from "./employees";
import { memberRoutes } from "./members";
import { volunteersRoutes } from "./volunteers";

const HRModuleChildren: NavGroup[] = [employeesRoutes, memberRoutes, volunteersRoutes ,  rolesRoutes];
export const HRModule: NavModule = {
  name: "Human Resources",
  icon: "mdi-account-group-outline",
  route: "/hr",
  permissions: [],
  children: HRModuleChildren,
};
