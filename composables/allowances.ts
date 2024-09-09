import { fetchAllowances } from "./allowances/loadAllAllowances";
import { removeAllowance } from "./allowances/removeAllowance";
import { validateAllowance } from "./allowances/validateAllowances";

export function useAllowances() {
  return {
    fetchAllowances,
    removeAllowance,
    validateAllowance,
  };
}
