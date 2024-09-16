import { createProjectPost } from "./timelines/create";
import { validatePost } from "./timelines/validatePost";

export function useProjectTimeline() {
  return {
    validatePost,
    createPost: createProjectPost,
  };
}
