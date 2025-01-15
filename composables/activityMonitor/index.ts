import type { BaseModel, RecordModel } from "pocketbase";
import type {
  UserActivitiesRecord,
  UserActivitiesResponse,
} from "~/app/pocketbase-types";

export const UserActivitiesCollection =
  usePocketBase().collection("user_activities");

export type TUserActivity = RecordModel &
  UserActivitiesRecord &
  UserActivitiesResponse &
  BaseModel;

export const activitiesPerPage = 10;
