import { createProject } from "./projects/create";
import { getAll } from "./projects/get";
import { validateProject } from "./projects/validateProject";

export function useProjects() {
  return {
    validateProject,
    create: createProject,
    getAll,
  };
}
