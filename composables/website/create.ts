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

export async function addBlogTopic(topic: TTopic) {
  const response = await backendRequestOne<TTopic>(async () => {
    return await BlogTopicsCollection.create(topic);
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.website,
      UserActivitiesCategoriesOptions.web_topics,
    ];
    const obj_before = null;
    const obj_after = response.model;
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

export async function addBlogArticle(topic: TTopic, article: TArticle) {
  const response = await backendRequestOne<TArticle>(async () => {
    return await BlogArticlesCollection.create(
      Object.assign({ topic: topic?.id }, article)
    );
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.website,
      UserActivitiesCategoriesOptions.web_topics,
      UserActivitiesCategoriesOptions.web_articles,
    ];
    const obj_before = null;
    const obj_after = response.model;
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
