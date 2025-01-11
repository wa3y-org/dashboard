import type { BaseModel, RecordModel } from "pocketbase";
import type { PurchasesRecord, PurchasesResponse } from "~/app/pocketbase-types";


export const PurchasesCollection = usePocketBase().collection('purchases')

export type TPurchaseRequest = RecordModel & PurchasesRecord & PurchasesResponse & BaseModel