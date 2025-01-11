import v8n from "v8n";
import type { TProjectPurchasesComity } from "./index";

function validateEmployee(member: any) {
  const errors: string[] = [];
  if (!member || !member?.id) {
    errors.push("Invalid Budgetline");
  }
  return errors;
}

export function validateMember(member: TProjectPurchasesComity) {
  const errors: { [key: string]: string[] } = {
    employee: validateEmployee(member.employee)
  };

  return errors;
}
