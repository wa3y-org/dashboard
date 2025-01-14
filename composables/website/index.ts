import type { BaseModel, RecordModel } from "pocketbase";
import type {
  BlogTopicsRecord,
  BlogTopicsResponse,
} from "~/app/pocketbase-types";

export const BlogTopicsCollection = usePocketBase().collection("blog_topics");

export type TTopic = RecordModel &
  BlogTopicsRecord &
  BlogTopicsResponse &
  BaseModel;
