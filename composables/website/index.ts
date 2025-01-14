import type { BaseModel, RecordModel } from "pocketbase";
import type {
  BlogArticlesRecord,
  BlogArticlesResponse,
  BlogTopicsRecord,
  BlogTopicsResponse,
} from "~/app/pocketbase-types";

export const BlogTopicsCollection = usePocketBase().collection("blog_topics");

export type TTopic = RecordModel &
  BlogTopicsRecord &
  BlogTopicsResponse &
  BaseModel;

export const BlogArticlesCollection =
  usePocketBase().collection("blog_articles");

export type TArticle = RecordModel &
  BlogArticlesRecord &
  BlogArticlesResponse &
  BaseModel;
