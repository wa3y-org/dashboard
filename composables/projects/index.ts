import type { AuthModel, BaseModel, RecordModel } from "pocketbase";
import type { ProjectsRecord, ProjectsResponse } from "~/app/pocketbase-types";

export type TProject = ProjectsRecord &
  ProjectsResponse &
  BaseModel &
  RecordModel;

export const ProjectsCollection = usePocketBase().collection("projects");
