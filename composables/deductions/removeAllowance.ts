import { deleteDeduction } from "~/app/modules/salary/deductions";

export async function removeDeduction(id: string) {
  return await deleteDeduction(id);
}
