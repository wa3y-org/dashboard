import v8n from "v8n";
import type { TArticle, TTopic } from "./index";

function validateTitle(title: any) {
  const errors: string[] = [];
  if (
    !v8n()
      .string()
      .minLength(3)
      .test(title?.trim() || "")
  ) {
    errors.push("Invalid title, min length must be 3 characters");
  }
  return errors;
}

function validateContent(title: any) {
  const errors: string[] = [];
  if (
    !v8n()
      .string()
      .minLength(100)
      .test(title?.trim() || "")
  ) {
    errors.push("Invalid text, min length must be 100 characters");
  }
  return errors;
}

export function validateTopic(topic: TTopic) {
  const errors: { [key: string]: string[] } = {
    title: validateTitle(topic.title),
  };

  return errors;
}

export function validateArticle(article: TArticle) {
  const errors: { [key: string]: string[] } = {
    title: validateTitle(article.title),
    full_text: validateContent(article.full_text),
  };

  return errors;
}
