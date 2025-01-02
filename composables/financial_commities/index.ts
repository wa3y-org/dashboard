import type { BaseModel, RecordModel } from "pocketbase";
import type { ProjectFinancialCommitiesRecord, ProjectFinancialCommitiesResponse } from "~/app/pocketbase-types";


export const ProjectFinancialCommitiesCollection = usePocketBase().collection('project_financial_commities')

export type TProjectFinancialCommity = RecordModel & ProjectFinancialCommitiesRecord & ProjectFinancialCommitiesResponse & BaseModel