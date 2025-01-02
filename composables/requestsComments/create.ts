import { backendRequestOne } from "~/app/core/BackendRequest";
import { FinancialRequestsCommentsCollection, type TFinancialRequestsComment } from "./index";

export async function addFinancialRequestComment(comment: TFinancialRequestsComment, request_id: string) {
  return await backendRequestOne<TFinancialRequestsComment>(async () => {
    return await FinancialRequestsCommentsCollection.create(Object.assign(
      {
        financial_request: request_id,
        employee: usePocketBase().authStore.model?.id
      }, comment)
    );
  });
}
