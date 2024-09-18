import type { NavGroup } from "../types";

export const salaryRoutes: NavGroup = [
  {
    name: "Payroll",
    icon: "mdi-account-cash-outline",
    route: "/finance/payroll",
    permissions: [],
  },
  {
    name: "Salary Payments",
    icon: "mdi-cash-multiple mdi-rotate-225",
    route: "/finance/salary-report",
    permissions: [],
  },
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
