import { deleteAllowance } from "~/app/modules/salary/allowances";

export async function removeAllowance(id: string) {
  return await deleteAllowance(id);
}
