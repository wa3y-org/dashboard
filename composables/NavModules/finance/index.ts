import type { NavGroup, NavModule } from "../types";
import { assetsRoutes } from "./assets";
import { salaryRoutes } from "./salary";

const FinanceModuleChildren: NavGroup[] = [assetsRoutes, salaryRoutes];

export const FinanceModule: NavModule = {
  name: "Finance",
  icon: "mdi-finance",
  route: "/finance",
  permissions: [],
  children: FinanceModuleChildren,
};
