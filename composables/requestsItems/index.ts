import type { BaseModel, RecordModel } from "pocketbase";
import type { FinancialRequestItemsRecord, FinancialRequestItemsResponse } from "~/app/pocketbase-types";


export const FinancialRequestsItemsCollection = usePocketBase().collection('financial_request_items')

export type TFinancialRequestsItem = RecordModel & FinancialRequestItemsRecord & FinancialRequestItemsResponse & BaseModel