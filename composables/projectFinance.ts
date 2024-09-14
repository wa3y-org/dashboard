import { addProjectFinance } from "./projectFinance/create";
import { getProjectDonations, getProjectExpenses } from "./projectFinance/get";
import { removeFinance } from "./projectFinance/remove";
import { updateProjectFinance } from "./projectFinance/update";
import { validateFinance } from "./projectFinance/validateFinance";

export function useProjectFinance() {
  return {
    validate: validateFinance,
    create: addProjectFinance,
    getDonations: getProjectDonations,
    getExpenses: getProjectExpenses,
    remove: removeFinance,
    update: updateProjectFinance,
  };
}
