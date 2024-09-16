import type { BaseModel, RecordModel } from "pocketbase";
import type {
  ProjectsTimelinesRecord,
  ProjectsTimelinesResponse,
} from "~/app/pocketbase-types";

export type TTimeLinePost = ProjectsTimelinesRecord &
  ProjectsTimelinesResponse &
  BaseModel &
  RecordModel;

export const ProjectTimelineCollection =
  usePocketBase().collection("projects_timelines");

export const ActivityTimelineCollection =
  usePocketBase().collection("activities_timelines");

export const postsPerPage = 5;
