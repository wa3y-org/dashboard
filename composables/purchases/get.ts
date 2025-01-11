import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";
import { PurchasesCollection, type TPurchaseRequest } from "./index";

export async function getAllPurchasesRequests(project_id: string) {
  return await backendRequestMultiple<TPurchaseRequest>(async () => {
    return await PurchasesCollection.getFullList({
      filter: `
        project="${project_id}"
      `,
      expand: "creator, financial_request_items_via_financial_request"
    });
  });
}

export async function getOnePurchaseRequest(id: string) {
  return await backendRequestOne<TPurchaseRequest>(async () => {
    return await PurchasesCollection.getOne(id, {
      expand: "creator"
    });
  });
}
