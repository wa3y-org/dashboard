import { backendRequestOne } from "~/app/core/BackendRequest";
import { BlogTopicsCollection, type TTopic } from "./index";

export async function removeBlogTopic(topic: TTopic) {
  return await backendRequestOne<TTopic>(async () => {
    return await BlogTopicsCollection.delete(topic.id);
  });
}
