import type { BaseModel, RecordModel } from "pocketbase";
import type {
  FinanceRecord,
  FinanceResponse,
} from "~/app/pocketbase-types";

export type TFinance = FinanceRecord &
  FinanceResponse &
  RecordModel &
  BaseModel;

export type TFinanceTypes = "donation" | "expense";
export const validFinanceTypes: TFinanceTypes[] = [
  "donation",
  "expense",
];

export const FinanceCollection = usePocketBase().collection('finance');