import { addEmployeeAdvance } from "./advances/create";
import {
  getAllEmployeesAdvances,
  getEmployeeOneAdvance,
  getOneEmployeeAdvances,
} from "./advances/get";
import { removeEmployeeAdvance } from "./advances/remove";
import { updateEmployeeAdvance } from "./advances/update";
import { validateAdvance } from "./advances/validate";

export function useEmployeesAdvances() {
  return {
    validate: validateAdvance,
    create: addEmployeeAdvance,
    update: updateEmployeeAdvance,
    remove: removeEmployeeAdvance,
    get: {
      all: getAllEmployeesAdvances,
      one: getEmployeeOneAdvance,
      employeeAdvances: getOneEmployeeAdvances,
    },
  };
}
