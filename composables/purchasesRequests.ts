import { addPurchaseRequest } from "./purchases/create";
import {
  getAllPurchasesRequests,
  getOnePurchaseRequest,
} from "./purchases/get";
import {
  removePurchaseRequest,
  removePurchaseRequestBill,
} from "./purchases/remove";
import { updatePurchaseRequest } from "./purchases/update";
import { validatePurchaseRequest } from "./purchases/validate";

export function usePurchasesRequests() {
  return {
    validate: validatePurchaseRequest,
    create: addPurchaseRequest,
    get: {
      all: getAllPurchasesRequests,
      one: getOnePurchaseRequest,
    },
    update: updatePurchaseRequest,
    remove: removePurchaseRequest,
    bills: {
      remove: removePurchaseRequestBill,
    },
  };
}
