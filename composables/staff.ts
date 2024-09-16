import { addActivityStaff, addProjectStaff } from "./staff/create";
import { getActivityStaff, getProjectStaff } from "./staff/get";
import { removeActivityStaff, removeStaff } from "./staff/remove";
import { updateActivityStaff, updateStaff } from "./staff/update";
import { validateStaff } from "./staff/validateStaff";

export function useStaff() {
  return {
    validate: validateStaff,
    addProjectStaff,
    getProjectStaff,
    addActivityStaff,
    getActivityStaff,
    remove: removeStaff,
    update: updateStaff,
    removeActivityStaff,
    updateActivityStaff
  };
}
