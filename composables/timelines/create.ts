import { ProjectTimelineCollection, type TTimeLinePost } from "./index";
import type { TProject } from "../projects/index";
import { backendRequestOne } from "~/app/core/BackendRequest";
import { AuthService } from "~/app/modules/users/services";

export async function createProjectPost(
  project: TProject,
  post: TTimeLinePost
) {
  return await backendRequestOne<TTimeLinePost>(async () => {
    console.log(usePocketBase().authStore.model);
    alert(usePocketBase().authStore.model.id)
    return await ProjectTimelineCollection.create({
      project: project.id,
      creator: usePocketBase().authStore.model?.id || '',
      title: post.title,
      post: post.post,
      reply_to: null,
    });
  });
}
