import v8n from "v8n";
import type { TArticle, TTopic, TWebsiteResource } from "./index";

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
      .minLength(30)
      .test(title?.trim() || "")
  ) {
    errors.push("Invalid text, min length must be 30 characters");
  }
  return errors;
}

export function validateWebResource(resource: TWebsiteResource) {
  const errors: { [key: string]: string[] } = {
    title: validateTitle(resource.title),
    full_text: validateContent(resource.full_text),
  };

  return errors;
}
