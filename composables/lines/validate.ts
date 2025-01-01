import v8n from "v8n";
import type { TProjectBudgetLine } from "./index";

function validateTitle(title: any) {
  const errors: string[] = [];
  if (!v8n().string().minLength(3).test(title?.trim() || '')) {
    errors.push("Invalid title, min length must be 3 characters");
  }
  return errors;
}


function validateTotal(n: any) {
  const errors: string[] = [];
  if (!v8n().number().greaterThanOrEqual(0).test(n)) {
    errors.push("Invalid Total, min must be 0.1");
  }
  return errors;
}

export function validateBudgetline(line: TProjectBudgetLine) {
  const errors: { [key: string]: string[] } = {
    title: validateTitle(line.title),
    budget: validateTotal(line.budget)
  };

  return errors;
}
