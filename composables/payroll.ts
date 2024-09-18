import { createPayroll } from "./payroll/create";
import { validatePayroll } from "./payroll/validate";

export function usePayroll() {
  return {
    create: createPayroll,
    validate: validatePayroll
  };
}
