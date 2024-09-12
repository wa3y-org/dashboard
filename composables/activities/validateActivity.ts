import v8n from "v8n";
import type {
  ProjectsActivitiesRecord,
  ProjectsActivitiesResponse,
} from "~/app/pocketbase-types";

function validateTitle(title: string) {
  const errors: string[] = [];
  if (!v8n().string().minLength(3).test(title.trim())) {
    errors.push("Invalid title, min length must be 3 characters");
  }
  return errors;
}

export function validateActivity(
  activity: ProjectsActivitiesRecord | ProjectsActivitiesResponse
) {
  const errors: { [key: string]: string[] } = {
    title: validateTitle(activity.title),
    place: [],
    starting_date: [],
    end_date: [],
    description: [],
  };

  return errors;
}
