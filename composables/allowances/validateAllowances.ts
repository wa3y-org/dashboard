import v8n from "v8n";
import type { AllowanceOptionsRecord } from "~/app/pocketbase-types";

export function validateAllowance(allowance: AllowanceOptionsRecord) {
  
  const errors: {
    title: string[];
    amount: string[];
  } = {
    title: [],
    amount: [],
  };

  if (!v8n().string().minLength(2).test(allowance.title?.trim())) {
    errors.title.push("Allowance title must be at least two characters long");
  }

  if (!v8n().number().greaterThan(0.009).test(allowance.amount)) {
    errors.amount.push("Minimum amount must be 0.01");
  }

  return errors;
}
