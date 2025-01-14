import { backendRequestOne } from "~/app/core/BackendRequest";
import { BlogArticlesCollection, BlogTopicsCollection, type TArticle, type TTopic } from "./index";

export async function updateBlogTopic(topic: TTopic) {
  return await backendRequestOne<TTopic>(async () => {
    return await BlogTopicsCollection.update(
      topic.id,
      Object.assign({}, topic)
    );
  });
}

export async function updateBlogArticle(article: TArticle) {
  return await backendRequestOne<TArticle>(async () => {
    return await BlogArticlesCollection.update(
      article.id,
      Object.assign({}, article)
    );
  });
}
