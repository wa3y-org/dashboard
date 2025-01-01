import v8n from "v8n";
import type { TFinancialRequestsItem } from "./index";
import type { TProjectBudgetLine } from "../lines";

function validateTitle(title: any) {
  const errors: string[] = [];
  if (!v8n().string().minLength(3).test(title?.trim() || '')) {
    errors.push("Invalid title, min length must be 3 characters");
  }
  return errors;
}

function validateBudgetLint(line: TProjectBudgetLine) {
  const errors: string[] = [];
  if (!line || !line.id) {
    errors.push("Invalid Budgetline");
  }
  return errors;
}

export function validateFinancialRequestItem(item: TFinancialRequestsItem) {
  const errors: { [key: string]: string[] } = {
    title: validateTitle(item.title),
    budget_line: validateBudgetLint(item.budget_line),
  };

  return errors;
}
