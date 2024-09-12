import type {
  ProjectsActivitiesRecord,
  ProjectsActivitiesResponse,
} from "~/app/pocketbase-types";

export type TActivity = ProjectsActivitiesRecord | ProjectsActivitiesResponse;

export const ActivitiesCollection = usePocketBase().collection("projects_activities");
