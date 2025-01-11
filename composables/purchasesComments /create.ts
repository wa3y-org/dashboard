import { backendRequestOne } from "~/app/core/BackendRequest";
import { PurchasesRequestsCommentsCollection, type TPurchasesRequestsComment } from "./index";

export async function addPurchasesRequestComment(comment: TPurchasesRequestsComment, request_id: string) {
  return await backendRequestOne<TPurchasesRequestsComment>(async () => {
    return await PurchasesRequestsCommentsCollection.create(Object.assign(
      {
        purchase: request_id,
        employee: usePocketBase().authStore.model?.id
      }, comment)
    );
  });
}
