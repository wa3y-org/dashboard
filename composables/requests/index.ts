import type { BaseModel, RecordModel } from "pocketbase";
import type { FinancialRequestsRecord, FinancialRequestsResponse, ProjectBudgitlinesRecord, ProjectBudgitlinesResponse } from "~/app/pocketbase-types";


export const FinancialRequestsCollection = usePocketBase().collection('financial_requests')

export type TFinancialRequest = RecordModel & FinancialRequestsRecord & FinancialRequestsResponse & BaseModel