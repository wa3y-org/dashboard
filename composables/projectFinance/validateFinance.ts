import v8n from "v8n";
import { validProjectFinanceTypes, type TProjectFinance } from "./index";
import type { TProject } from "../projects/index";

function validateFundFacilityName(name: any) {
  const errors: string[] = [];
  if (!v8n().string().minLength(2).test(name?.trim())) {
    errors.push("Invalid Facility Name, min length must be 2 characters");
  }
  return errors;
}

function validateAmount(amount: any) {
  const errors: string[] = [];
  if (!v8n().number().greaterThan(0.009999).test(Number(amount))) {
    errors.push("Invalid amount, min must be 0.01 USD");
  }
  return errors;
}

function validateType(type: any) {
  const errors: string[] = [];
  if (!validProjectFinanceTypes.includes(type)) {
    errors.push("In valid type : it must be one off =>  " + validProjectFinanceTypes.join(", "));
  }
  return errors;
}

export function validateFinance(project: TProject, finance: TProjectFinance) {
  const errors = {
    fund_facility: validateFundFacilityName(finance.fund_facility),
    amount: validateAmount(finance.amount),
    statement: [],
    type: validateType(finance.type)
  };
  return errors;
}
