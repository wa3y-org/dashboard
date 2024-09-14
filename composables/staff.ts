import { addProjectStaff } from "./staff/create";
import { getProjectStaff } from "./staff/get";
import { removeStaff } from "./staff/remove";
import { updateStaff } from "./staff/update";
import { validateStaff } from "./staff/validateStaff";

export function useStaff() {
  return {
    validate: validateStaff,
    addProjectStaff,
    getProjectStaff,
    remove: removeStaff,
    update: updateStaff,
  };
}
