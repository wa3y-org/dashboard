import { addActivityStaff, addProjectStaff } from "./staff/create";
import { getActivityStaff, getProjectEmployees, getProjectStaff } from "./staff/get";
import { removeActivityStaff, removeStaff } from "./staff/remove";
import { updateActivityStaff, updateStaff } from "./staff/update";
import { validateStaff } from "./staff/validateStaff";

export function useStaff() {
  return {
    validate: validateStaff,
    addProjectStaff,
    getProjectStaff,
    getProjectEmployees,
    addActivityStaff,
    getActivityStaff,
    remove: removeStaff,
    update: updateStaff,
    removeActivityStaff,
    updateActivityStaff
  };
}
