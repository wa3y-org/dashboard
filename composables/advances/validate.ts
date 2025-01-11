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

function validateDeduction(advance: TAdvance) {
  const errors: string[] = [];
  if (
    !v8n()
      .number()
      .greaterThanOrEqual(0.9999999)
      .lessThanOrEqual(advance.amount)
      .test(advance.deduction)
  ) {
    errors.push(`Invalid Deduction, min must be 1 and max must be ${advance.amount}`);
  }
  return errors;
}

export function validateAdvance(advance: TAdvance) {
  const errors: { [key: string]: string[] } = {
    amount: validateTotal(advance.amount),
    employee: validateEmployee(advance.employee),
    deduction: validateDeduction(advance),
    statement: [],
  };

  return errors;
}

export function validatePayment(payment: any) {
  const errors: { [key: string]: string[] } = {
    amount: validateTotal(payment.amount),
    statement: [],
  };

  return errors;
}
