import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";
import {
  BlogArticlesCollection,
  BlogTopicsCollection,
  type TArticle,
  type TTopic,
} from "./";

export async function getAllBlogTopics() {
  return await backendRequestMultiple<TTopic>(async () => {
    return await BlogTopicsCollection.getFullList();
  });
}

export async function getOneBlogTopic(id: string) {
  return await backendRequestOne<TTopic>(async () => {
    return await BlogTopicsCollection.getOne(id);
  });
}

export async function getAllBlogArticles() {
  return await backendRequestMultiple<TArticle>(async () => {
    return await BlogArticlesCollection.getFullList({
      expand: "topic",
    });
  });
}

export async function getBlogArticlesByTopic(topic: TTopic) {
  return await backendRequestMultiple<TArticle>(async () => {
    return await BlogArticlesCollection.getFullList({
      filter: `
        topic = "${topic.id}"
      `,
      expand: "topic",
    });
  });
}

export async function getOneBlogArticle(id: string) {
  return await backendRequestOne<TArticle>(async () => {
    return await BlogArticlesCollection.getOne(id, {
      expand: "topic",
    });
  });
}
