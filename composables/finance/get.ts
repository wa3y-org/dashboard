import { backendRequestMultiple } from "~/app/core/BackendRequest";
import { FinanceCollection, type TFinance } from "./index";
import { FinanceTypeOptions } from "~/app/pocketbase-types";

export async function getDonations() {
  return await getFinance(FinanceTypeOptions.donation);
}

export async function getExpenses() {
  return await getFinance(FinanceTypeOptions.expense);
}

export async function getFinance(
  type: FinanceTypeOptions
) {
  return await backendRequestMultiple<TFinance>(async () => {
    return await FinanceCollection.getFullList({
      filter: `
        type="${type}"
      `,
    });
  });
}
