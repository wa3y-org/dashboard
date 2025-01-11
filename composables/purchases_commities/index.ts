import type { BaseModel, RecordModel } from "pocketbase";
import type {
  ProjectPurchasesCommitiesRecord,
  ProjectPurchasesCommitiesResponse,
} from "~/app/pocketbase-types";

export const ProjectPurchasesComitiesCollection = usePocketBase().collection(
  "project_purchases_commities"
);

export type TProjectPurchasesComity = RecordModel &
  ProjectPurchasesCommitiesRecord &
  ProjectPurchasesCommitiesResponse &
  BaseModel;
