import { createProjectPost, createProjectPostReply } from "./timelines/create";
import { getProjectTimelinePosts, getProjectTimelinePostsReplies } from "./timelines/get";
import { validatePost } from "./timelines/validatePost";

export function useProjectTimeline() {
  return {
    validatePost,
    createPost: createProjectPost,
    createReply: createProjectPostReply,
    getPosts: getProjectTimelinePosts,
    getReplies: getProjectTimelinePostsReplies
  };
}
