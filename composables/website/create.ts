import { backendRequestOne } from "~/app/core/BackendRequest";
import { AuthService } from "~/app/modules/users/services";
import { FinancialRequestsStatusOptions } from "~/app/pocketbase-types";
import { BlogTopicsCollection, type TTopic } from "./index";

export async function addBlogTopic(topic: TTopic) {
  return await backendRequestOne<TTopic>(async () => {
    return await BlogTopicsCollection.create(topic);
  });
}
