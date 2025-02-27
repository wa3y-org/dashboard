import { addBankCheck } from "./bank_checks/create";
import { getAllBankChecks, getOneBankCheck } from "./bank_checks/get";
import { removeBankCheck } from "./bank_checks/remove";
import { updateBankCheck } from "./bank_checks/update";
import { validateBankCheck } from "./bank_checks/validate";

export function useBankChecks() {
  return {
    validate: validateBankCheck,
    create: addBankCheck,
    get: {
      all: getAllBankChecks,
      one: getOneBankCheck,
    },
    update: updateBankCheck,
    remove: removeBankCheck,
  };
}
