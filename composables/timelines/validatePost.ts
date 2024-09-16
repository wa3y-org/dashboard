import v8n from "v8n";
import type { TTimeLinePost } from ".";

function validateTitle(title: string) {
  const errors: string[] = [];
  if (!v8n().string().minLength(3).test(title.trim())) {
    errors.push("Invalid title, min length must be 3 characters");
  }
  return errors;
}

export function validatePost(post: TTimeLinePost) {
  const errors: { [key: string]: string[] } = {
    title: validateTitle(post.title),
    post: [],
  };

  return errors;
}
