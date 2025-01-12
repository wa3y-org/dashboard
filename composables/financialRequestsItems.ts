import { addFinancialRequestItem } from "./requestsItems/create";
import { getAllItems, getOneItem } from "./requestsItems/get";
import { removeItem, removeItemBill } from "./requestsItems/remove";
import { updateItem } from "./requestsItems/update";
import { validateFinancialRequestItem } from "./requestsItems/validate";

export function useFinancialRequestsItems() {
  return {
    validate: validateFinancialRequestItem,
    create: addFinancialRequestItem,
    get: {
      all: getAllItems,
      one: getOneItem,
    },
    update: updateItem,
    remove: removeItem,
    bills: {
      remove: removeItemBill,
    },
  };
}
