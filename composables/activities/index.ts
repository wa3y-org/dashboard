import type { BaseModel } from "pocketbase";
import type {
  ProjectsActivitiesRecord,
  ProjectsActivitiesResponse,
} from "~/app/pocketbase-types";

export type TActivity = ProjectsActivitiesRecord & ProjectsActivitiesResponse & BaseModel;

export const ActivitiesCollection = usePocketBase().collection("projects_activities");
