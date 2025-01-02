import type { BaseModel, RecordModel } from "pocketbase";
import type { FinancialReqeuestsCommityCommentsRecord, FinancialReqeuestsCommityCommentsResponse, FinancialRequestItemsRecord, FinancialRequestItemsResponse } from "~/app/pocketbase-types";


export const FinancialRequestsCommentsCollection = usePocketBase().collection('financial_reqeuests_commity_comments');

export type TFinancialRequestsComment = RecordModel & FinancialReqeuestsCommityCommentsRecord & FinancialReqeuestsCommityCommentsResponse & BaseModel

export const commentsPerPage = 5;