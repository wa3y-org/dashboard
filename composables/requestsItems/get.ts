import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";
import { FinancialRequestsItemsCollection, type TFinancialRequestsItem } from "./index";

export async function getAllItems(request_id: string) {
  return await backendRequestMultiple<TFinancialRequestsItem>(async () => {
    return await FinancialRequestsItemsCollection.getFullList({
      filter: `
        financial_request="${request_id}"
      `,
      expand: "financial_request, budget_line"
    });
  });
}

export async function getOneItem(id: string) {
  return await backendRequestOne<TFinancialRequestsItem>(async () => {
    return await FinancialRequestsItemsCollection.getOne(id, {
      expand: "financial_request, budget_line"
    });
  });
}
