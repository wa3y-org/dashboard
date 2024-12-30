import type { NavGroup } from "../types";

export const financeRoutes: NavGroup = [
  {
    name: "Donations",
    icon: "mdi-cash-fast",
    route: "/finance/grants",
    permissions: [],
  },
  {
    name: "Expenses",
    icon: "mdi-cash-minus",
    route: "/finance/expenses",
    permissions: [],
  },
];
