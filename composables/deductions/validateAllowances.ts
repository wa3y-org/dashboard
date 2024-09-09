import v8n from "v8n";
import type { DeductionOptionsRecord } from "~/app/pocketbase-types";

export function validateDeduction(deduction: DeductionOptionsRecord) {
  const errors: {
    title: string[];
    amount: string[];
  } = {
    title: [],
    amount: [],
  };

  if (!v8n().string().minLength(2).test(deduction.title?.trim())) {
    errors.title.push("Deduction title must be at least two characters long");
  }

  if (!v8n().number().greaterThan(0.009).test(deduction.amount)) {
    errors.amount.push("Minimum amount must be 0.01");
  }

  return errors;
}
