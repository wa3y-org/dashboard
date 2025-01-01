import { addFinancialRequest } from "./requests/create";
import { getAllFinancialRequests, getOneFinancialRequest } from "./requests/get";
import { removeFinancialRequest } from "./requests/remove";
import { updateFinancialRequest } from "./requests/update";
import { validateFinancialRequest } from "./requests/validate";

export function useFinancialRequests() {
  return {
    validate: validateFinancialRequest,
    create: addFinancialRequest,
    get: {
      all: getAllFinancialRequests,
      one: getOneFinancialRequest,
    },
    update: updateFinancialRequest,
    remove: removeFinancialRequest,
  };
}
