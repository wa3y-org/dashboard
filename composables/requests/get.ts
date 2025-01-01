import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";
import { FinancialRequestsCollection, type TFinancialRequest } from "./index";

export async function getAllFinancialRequests(project_id: string) {
  return await backendRequestMultiple<TFinancialRequest>(async () => {
    return await FinancialRequestsCollection.getFullList({
      filter: `
        project="${project_id}"
      `,
      expand: "creator, financial_request_items_via_financial_request"
    });
  });
}

export async function getOneFinancialRequest(id: string) {
  return await backendRequestOne<TFinancialRequest>(async () => {
    return await FinancialRequestsCollection.getOne(id, {
      expand: "creator"
    });
  });
}
