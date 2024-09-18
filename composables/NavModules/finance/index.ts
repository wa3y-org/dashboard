import type { NavGroup, NavModule } from "../types";
import { assetsRoutes } from "./assets";
import { financeRoutes } from "./finance";
import { salaryRoutes } from "./salary";

const FinanceModuleChildren: NavGroup[] = [assetsRoutes, financeRoutes, salaryRoutes];

export const FinanceModule: NavModule = {
  name: "Finance",
  icon: "mdi-finance",
  route: "/finance",
  permissions: [],
  children: FinanceModuleChildren,
};
