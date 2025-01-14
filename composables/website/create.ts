import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  BlogArticlesCollection,
  BlogTopicsCollection,
  type TArticle,
  type TTopic,
} from "./index";

export async function addBlogTopic(topic: TTopic) {
  return await backendRequestOne<TTopic>(async () => {
    return await BlogTopicsCollection.create(topic);
  });
}

export async function addBlogArticle(topic: TTopic, article: TArticle) {
  return await backendRequestOne<TArticle>(async () => {
    return await BlogArticlesCollection.create(
      Object.assign({ topic: topic?.id }, article)
    );
  });
}
