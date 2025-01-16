import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  BlogArticlesCollection,
  BlogTopicsCollection,
  type TArticle,
  type TTopic,
} from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function removeBlogTopic(topic: TTopic) {
  const Data = await BlogTopicsCollection.getOne(topic.id);
  const response = await backendRequestOne<TTopic>(async () => {
    return await BlogTopicsCollection.delete(topic.id);
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.website,
      UserActivitiesCategoriesOptions.web_topics,
    ];
    const obj_before = Data;
    const obj_after = null;
    const comment = null;

    useActivityMonitor().create(
      action,
      categories,
      obj_before,
      obj_after,
      comment
    );
  }

  return response;
}

export async function removeBlogArticle(article: TArticle) {
  const Data = await BlogArticlesCollection.getOne(article.id);
  const response = await backendRequestOne<TArticle>(async () => {
    return await BlogArticlesCollection.delete(article.id);
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.website,
      UserActivitiesCategoriesOptions.web_topics,
      UserActivitiesCategoriesOptions.web_articles,
    ];
    const obj_before = Data;
    const obj_after = null;
    const comment = null;

    useActivityMonitor().create(
      action,
      categories,
      obj_before,
      obj_after,
      comment
    );
  }

  return response;
}
