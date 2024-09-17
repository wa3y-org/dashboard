import {
  addEmployeeAdvance,
  addEmployeeAdvancePayment,
} from "./advances/create";
import {
  getAdvancesPayments,
  getAllEmployeesAdvances,
  getEmployeeOneAdvance,
  getOneEmployeeAdvances,
} from "./advances/get";
import { removeEmployeeAdvance } from "./advances/remove";
import { updateEmployeeAdvance } from "./advances/update";
import { validateAdvance, validatePayment } from "./advances/validate";

export function useEmployeesAdvances() {
  return {
    validatePayment,
    addPayment: addEmployeeAdvancePayment,
    validate: validateAdvance,
    create: addEmployeeAdvance,
    update: updateEmployeeAdvance,
    remove: removeEmployeeAdvance,
    get: {
      all: getAllEmployeesAdvances,
      one: getEmployeeOneAdvance,
      employeeAdvances: getOneEmployeeAdvances,
      payments: getAdvancesPayments,
    },
  };
}
