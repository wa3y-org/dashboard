import { createPayroll } from "./payroll/create";
import { employeePayroll, searchPayroll } from "./payroll/get";
import { validatePayroll } from "./payroll/validate";

export function usePayroll() {
  return {
    create: createPayroll,
    validate: validatePayroll,
    search: searchPayroll,
    get: {
      employeePayroll,
    },
  };
}
