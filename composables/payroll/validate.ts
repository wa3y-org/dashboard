import { backendRequestOne } from "~/app/core/BackendRequest";
import { PayrollCollection, type TPayroll } from ".";
import v8n from "v8n";

function validatePayed(amount: any) {
  const errors: string[] = [];
  if (!v8n().number().greaterThanOrEqual(0.1).test(amount)) {
    errors.push("Invalid Total, min must be 0.1");
  }
  return errors;
}
export function validatePayroll(payroll: TPayroll) {
  const errors: { [key: string]: string[] } = {
    payed: validatePayed(payroll.payed),
  };
  return errors;
}
