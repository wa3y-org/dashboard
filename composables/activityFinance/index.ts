import type { BaseModel, RecordModel } from "pocketbase";
import type {
  ActivitiesFinanceRecord,
  ActivitiesFinanceResponse,
} from "~/app/pocketbase-types";

export type TActivityFinance = ActivitiesFinanceRecord &
  ActivitiesFinanceResponse &
  RecordModel &
  BaseModel;

export type TActivityFinanceTypes = "donation" | "expense";
export const validActivityFinanceTypes: TActivityFinanceTypes[] = [
  "donation",
  "expense",
];

export const ActivityFinanceCollection =
  usePocketBase().collection("activities_finance");
