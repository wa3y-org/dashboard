import { addActivityFinance } from "./activityFinance/create";
import {
  getActivityDonations,
  getActivityExpenses,
} from "./activityFinance/get";
import { removeFinance } from "./activityFinance/remove";
import { updateActivityFinance } from "./activityFinance/update";
import { validateFinance } from "./activityFinance/validateFinance";

export function useActivityFinance() {
  return {
    validate: validateFinance,
    create: addActivityFinance,
    getDonations: getActivityDonations,
    getExpenses: getActivityExpenses,
    remove: removeFinance,
    update: updateActivityFinance,
  };
}
