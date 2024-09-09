import type { DeductionOptionsRecord } from "~/app/pocketbase-types";

const pb = usePocketBase();

export async function getDeductions() {
  const records = await pb.collection("deduction_options").getFullList({
    sort: "-created",
  });

  return records;
}

export async function deleteDeduction(id: string) {
  return await pb.collection("deduction_options").delete(id);
}

export async function storeDeduction(deduction: DeductionOptionsRecord) {
  return await pb.collection("deduction_options").create(deduction);
}

export async function updateDeduction(deduction: DeductionOptionsRecord) {
  return await pb
    .collection("deduction_options")
    .update(deduction.id, deduction);
}
