import { addBlogArticle, addBlogTopic } from "./website/create";
import {
  getAllBlogArticles,
  getAllBlogTopics,
  getBlogArticlesByTopic,
  getOneBlogArticle,
  getOneBlogTopic,
} from "./website/get";
import { removeBlogArticle, removeBlogTopic } from "./website/remove";
import { updateBlogArticle, updateBlogTopic } from "./website/update";
import { validateArticle, validateTopic } from "./website/validate";

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

const articles = {
  create: addBlogArticle,
  validate: validateArticle,
  get: {
    all: getAllBlogArticles,
    byId: getOneBlogArticle,
    byTopic: getBlogArticlesByTopic,
  },
  remove: removeBlogArticle,
  update: updateBlogArticle,
};

export function useBlog() {
  return {
    topics,
    articles,
  };
}
