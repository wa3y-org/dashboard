import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";
import { BlogTopicsCollection, type TTopic } from "./";

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
