import { addFinance } from "./finance/create";
import { getDonations, getExpenses } from "./finance/get";
import { removeFinance } from "./finance/remove";
import { updateFinance } from "./finance/update";
import { validateFinance } from "./finance/validateFinance";

export function useFinance() {
  return {
    validate: validateFinance,
    create: addFinance,
    getDonations: getDonations,
    getExpenses: getExpenses,
    remove: removeFinance,
    update: updateFinance,
  };
}
