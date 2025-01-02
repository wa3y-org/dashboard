import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";
import { commentsPerPage, FinancialRequestsCommentsCollection, type TFinancialRequestsComment } from "./index";

export async function getAllComments(request_id: string) {
  return await backendRequestMultiple<TFinancialRequestsComment>(async () => {
    return await FinancialRequestsCommentsCollection.getFullList({
      filter: `
        financial_request="${request_id}"
      `,
      expand: "financial_request, employee",
      sort: "-updated"
    });
  });
}

export async function getPaginatedComments(request_id: string, page: number = 1) {
  return await backendRequestMultiple<TFinancialRequestsComment>(async () => {
    return await FinancialRequestsCommentsCollection.getList(
      page,
      commentsPerPage,
      {
        filter: `
        financial_request="${request_id}"
      `,
        expand: "financial_request, employee",
        sort: "-updated"
      });
  });
}

export async function getOneComment(id: string) {
  return await backendRequestOne<TFinancialRequestsComment>(async () => {
    return await FinancialRequestsCommentsCollection.getOne(id, {
      expand: "financial_request, employee"
    });
  });
}
