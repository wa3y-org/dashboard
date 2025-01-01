import type { BaseModel, RecordModel } from "pocketbase";
import type { ProjectBudgitlinesRecord, ProjectBudgitlinesResponse } from "~/app/pocketbase-types";


export const ProjectBudgitlinesCollection = usePocketBase().collection('project_budgitlines')

export type TProjectBudgetLine = RecordModel & ProjectBudgitlinesRecord & ProjectBudgitlinesResponse & BaseModel