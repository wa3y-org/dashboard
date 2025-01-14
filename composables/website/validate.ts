import v8n from "v8n";
import type { TTopic } from "./index";

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

export function validateTopic(request: TTopic) {
  const errors: { [key: string]: string[] } = {
    title: validateTitle(request.title),
  };

  return errors;
}
