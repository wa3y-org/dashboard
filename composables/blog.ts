import { addBlogTopic } from "./website/create";
import { getAllBlogTopics, getOneBlogTopic } from "./website/get";
import { removeBlogTopic } from "./website/remove";
import { updateBlogTopic } from "./website/update";
import { validateTopic } from "./website/validate";

const topics = {
  create: addBlogTopic,
  validate: validateTopic,
  get: {
    all: getAllBlogTopics,
    byId: getOneBlogTopic,
  },
  remove: removeBlogTopic,
  update: updateBlogTopic,
};

export function useBlog() {
  return {
    topics,
  };
}
