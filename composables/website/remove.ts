import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  BlogArticlesCollection,
  BlogTopicsCollection,
  type TArticle,
  type TTopic,
} from "./index";

export async function removeBlogTopic(topic: TTopic) {
  return await backendRequestOne<TTopic>(async () => {
    return await BlogTopicsCollection.delete(topic.id);
  });
}

export async function removeBlogArticle(article: TArticle) {
  return await backendRequestOne<TArticle>(async () => {
    return await BlogArticlesCollection.delete(article.id);
  });
}
