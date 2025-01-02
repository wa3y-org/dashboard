import v8n from "v8n";
import type { TProjectFinancialCommity } from "./index";

function validateEmployee(member: any) {
  const errors: string[] = [];
  if (!member || !member?.id) {
    errors.push("Invalid Budgetline");
  }
  return errors;
}

export function validateMember(member: TProjectFinancialCommity) {
  const errors: { [key: string]: string[] } = {
    employee: validateEmployee(member.employee)
  };

  return errors;
}
