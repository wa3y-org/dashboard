import {
  createActivityPost,
  createActivityPostReply,
  createProjectPost,
  createProjectPostReply,
} from "./timelines/create";
import {
  getActivityTimelinePosts,
  getActivityTimelinePostsReplies,
  getProjectTimelinePosts,
  getProjectTimelinePostsReplies,
} from "./timelines/get";
import { validatePost } from "./timelines/validatePost";

export function useProjectTimeline() {
  return {
    validatePost,
    createPost: createProjectPost,
    createReply: createProjectPostReply,
    getPosts: getProjectTimelinePosts,
    getReplies: getProjectTimelinePostsReplies,
    activity: {
      createPost: createActivityPost,
      createReply: createActivityPostReply,
      getPosts: getActivityTimelinePosts,
      getReplies: getActivityTimelinePostsReplies,
      validatePost,
    },
  };
}
