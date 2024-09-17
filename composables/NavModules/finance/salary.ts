import type { NavGroup } from "../types";

export const salaryRoutes: NavGroup = [
  {
    name: "Advances",
    icon: "mdi-invoice-arrow-right-outline",
    route: "/finance/advances",
    permissions: [],
  },
  {
    name: "Salary Settings",
    icon: "mdi-table-settings",
    route: "/finance/salaries/settings",
    permissions: [],
  },
];
