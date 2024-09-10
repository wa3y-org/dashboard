import { createProject } from "./projects/create";
import { getAll, getOne } from "./projects/get";
import { removeProject } from "./projects/remove";
import { updateProject } from "./projects/update";
import { validateProject } from "./projects/validateProject";

export function useProjects() {
  return {
    validateProject,
    getAll,
    create: createProject,
    remove: removeProject,
    getOne,
    update: updateProject,
  };
}
