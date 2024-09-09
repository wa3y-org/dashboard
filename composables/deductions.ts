import { fetchDeductions } from "./deductions/loadAllDeductions";
import { removeDeduction } from "./deductions/removeAllowance";
import { validateDeduction } from "./deductions/validateAllowances";

export function useDeductions() {
  return {
    fetchDeductions,
    removeDeduction,
    validateDeduction,
  };
}
