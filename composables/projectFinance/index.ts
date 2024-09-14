import type { BaseModel, RecordModel } from "pocketbase";
import type {
  ProjectFinanceRecord,
  ProjectFinanceResponse,
} from "~/app/pocketbase-types";

export type TProjectFinance = ProjectFinanceRecord &
  ProjectFinanceResponse &
  RecordModel &
  BaseModel;

export type TProjectFinanceTypes = "donation" | "expense";
export const validProjectFinanceTypes: TProjectFinanceTypes[] = [
  "donation",
  "expense",
];

export const ProjectFinanceCollection = usePocketBase().collection('project_finance');