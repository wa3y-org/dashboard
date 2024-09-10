import v8n from "v8n";
import type { ProjectsRecord } from "~/app/pocketbase-types";

function validateTitle(title: string) {
  const errors: string[] = [];
  if (!v8n().string().minLength(3).test(title.trim())) {
    errors.push("Invalid title, min length must be 3 characters");
  }
  return errors;
}

export function validateProject(project: ProjectsRecord) {
  const errors: { [key: string]: string[] } = {
    title: validateTitle(project.title),
    place: [],
    starting_date: [],
    end_date: [],
    details: [],
  };

  return errors;
}
