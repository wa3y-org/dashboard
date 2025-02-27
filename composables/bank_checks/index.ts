import type { BaseModel, RecordModel } from "pocketbase";
import type { BankChecksRecord, BankChecksResponse } from "~/app/pocketbase-types";


export const BankChecksCollection = usePocketBase().collection('bank_checks')

export type TBankCheck = RecordModel & BaseModel & BankChecksRecord & BankChecksResponse