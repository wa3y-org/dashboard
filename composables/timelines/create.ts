import { ActivityTimelineCollection, ProjectTimelineCollection, type TTimeLinePost } from "./index";
import type { TProject } from "../projects/index";
import { backendRequestOne } from "~/app/core/BackendRequest";
import { AuthService } from "~/app/modules/users/services";
import type { TActivity } from "../activities/index";

export async function createProjectPost(
  project: TProject,
  post: TTimeLinePost
) {
  return await backendRequestOne<TTimeLinePost>(async () => {
    return await ProjectTimelineCollection.create({
      project: project.id,
      creator: usePocketBase().authStore.model?.id || "",
      title: post.title,
      post: post.post,
      reply_to: null,
    });
  });
}

export async function createProjectPostReply(
  post: TTimeLinePost,
  reply: TTimeLinePost
) {
  return await backendRequestOne<TTimeLinePost>(async () => {
    return await ProjectTimelineCollection.create({
      project: null,
      creator: usePocketBase().authStore.model?.id || "",
      title: reply.title,
      post: reply.post,
      reply_to: post.id,
    });
  });
}

export async function createActivityPost(
  activity: TActivity,
  post: TTimeLinePost
) {
  return await backendRequestOne<TTimeLinePost>(async () => {
    return await ActivityTimelineCollection.create({
      activity: activity.id,
      creator: usePocketBase().authStore.model?.id || "",
      title: post.title,
      post: post.post,
      reply_to: null,
    });
  });
}

export async function createActivityPostReply(
  post: TTimeLinePost,
  reply: TTimeLinePost
) {
  return await backendRequestOne<TTimeLinePost>(async () => {
    return await ActivityTimelineCollection.create({
      activity: null,
      creator: usePocketBase().authStore.model?.id || "",
      title: reply.title,
      post: reply.post,
      reply_to: post.id,
    });
  });
}
