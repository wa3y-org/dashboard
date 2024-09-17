import v8n from "v8n";
import type { TAdvance } from "./index";

function validateTotal(n: any) {
  const errors: string[] = [];
  if (!v8n().number().greaterThanOrEqual(0.9999999).test(n)) {
    errors.push("Invalid Total, min must be 1");
  }
  return errors;
}

function validateEmployee(employee: any) {
  const errors: string[] = [];
  if (!employee || !employee.id || employee.collectionName != "employees") {
    errors.push("Invalid Employee Please Select one");
  }
  return errors;
}

export function validateAdvance(advance: TAdvance) {
  const errors: { [key: string]: string[] } = {
    amount: validateTotal(advance.amount),
    employee: validateEmployee(advance.employee),
    statement: []
  };

  return errors;
}
