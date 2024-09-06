import type { NavGroup, NavModule } from "../types";
import { salaryRoutes } from "./salary";

const FinanceModuleChildren: NavGroup[] = [salaryRoutes];

export const FinanceModule: NavModule = {
  name: "Finance",
  icon: "mdi-finance",
  route: "/finance",
  permissions: [],
  children: FinanceModuleChildren,
};
