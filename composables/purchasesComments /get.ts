import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";
import { commentsPerPage, PurchasesRequestsCommentsCollection, type TPurchasesRequestsComment } from "./index";

export async function getAllComments(request_id: string) {
  return await backendRequestMultiple<TPurchasesRequestsComment>(async () => {
    return await PurchasesRequestsCommentsCollection.getFullList({
      filter: `
        purchase="${request_id}"
      `,
      expand: "purchase, employee",
      sort: "-updated"
    });
  });
}

export async function getPaginatedComments(request_id: string, page: number = 1) {
  return await backendRequestMultiple<TPurchasesRequestsComment>(async () => {
    return await PurchasesRequestsCommentsCollection.getList(
      page,
      commentsPerPage,
      {
        filter: `
        purchase="${request_id}"
      `,
        expand: "purchase, employee",
        sort: "-updated"
      });
  });
}

export async function getOneComment(id: string) {
  return await backendRequestOne<TPurchasesRequestsComment>(async () => {
    return await PurchasesRequestsCommentsCollection.getOne(id, {
      expand: "financial_request, employee"
    });
  });
}
