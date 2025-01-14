import { backendRequestOne } from "~/app/core/BackendRequest";
import { BlogTopicsCollection, type TTopic } from "./index";

export async function updateBlogTopic(topic: TTopic) {
  return await backendRequestOne<TTopic>(async () => {
    return await BlogTopicsCollection.update(
      topic.id,
      Object.assign({}, topic)
    );
  });
}
