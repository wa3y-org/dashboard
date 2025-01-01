import { addBudgetline } from "./lines/create";
import { getAllBudgetlines, getOneBudgetline } from "./lines/get";
import { removeBudgetline } from "./lines/remove";
import { updateBudgetline } from "./lines/update";
import { validateBudgetline } from "./lines/validate";

export function useProjectBudgetlines() {
  return {
    validate: validateBudgetline,
    create: addBudgetline,
    get: {
      all: getAllBudgetlines,
      one: getOneBudgetline,
    },
    update: updateBudgetline,
    remove: removeBudgetline,
  };
}
