import type { AllowanceOptionsRecord } from "~/app/pocketbase-types";

const pb = usePocketBase();

export async function getAllowances() {
  const records = await pb.collection("allowance_options").getFullList({
    sort: "-created",
  });

  return records;
}

export async function deleteAllowance(id: string) {
  return await pb.collection("allowance_options").delete(id);
}

export async function storeAllowance(allowance: AllowanceOptionsRecord) {
  return await pb.collection("allowance_options").create(allowance);
}

export async function updateAllowance(allowance: AllowanceOptionsRecord) {
  return await pb
    .collection("allowance_options")
    .update(allowance.id, allowance);
}
