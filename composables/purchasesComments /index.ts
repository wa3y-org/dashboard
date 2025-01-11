import type { BaseModel, RecordModel } from "pocketbase";
import type {
  PurchasesCommityCommentsRecord,
  PurchasesCommityCommentsResponse,
} from "~/app/pocketbase-types";

export const PurchasesRequestsCommentsCollection = usePocketBase().collection(
  "purchases_commity_comments"
);

export type TPurchasesRequestsComment = RecordModel &
  PurchasesCommityCommentsRecord &
  PurchasesCommityCommentsResponse &
  BaseModel;

export const commentsPerPage = 5;
