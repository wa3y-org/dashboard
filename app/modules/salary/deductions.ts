import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
  type DeductionOptionsRecord,
} from "~/app/pocketbase-types";

const pb = usePocketBase();

export async function getDeductions() {
  const records = await pb.collection("deduction_options").getFullList({
    sort: "-created",
  });

  return records;
}

export async function deleteDeduction(id: string) {
  const deductionData = await usePocketBase()
    .collection("deduction_options")
    .getOne(id);
  const response = await backendRequestOne<DeductionOptionsRecord>(async () => {
    return await pb.collection("deduction_options").delete(id);
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.deductions,
      UserActivitiesCategoriesOptions.hr,
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.payroll,
    ];
    const obj_before = deductionData;
    const obj_after = null;
    const comment = null;

    useActivityMonitor().create(
      action,
      categories,
      obj_before,
      obj_after,
      comment
    );
  }

  return response.model;
}

export async function storeDeduction(deduction: DeductionOptionsRecord) {
  
  const response = await backendRequestOne<DeductionOptionsRecord>(async () => {
    return await pb.collection("deduction_options").create(deduction);
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.deductions,
      UserActivitiesCategoriesOptions.hr,
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.payroll,
    ];
    const obj_before = null;
    const obj_after = response.model;
    const comment = null;

    useActivityMonitor().create(
      action,
      categories,
      obj_before,
      obj_after,
      comment
    );
  }

  return response.model;
}

export async function updateDeduction(deduction: DeductionOptionsRecord) {
  const deductionData = await usePocketBase()
    .collection("deduction_options")
    .getOne(deduction.id);
  const response = await backendRequestOne<DeductionOptionsRecord>(async () => {
    return await pb
      .collection("deduction_options")
      .update(deduction.id, deduction);
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.UPDATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.deductions,
      UserActivitiesCategoriesOptions.hr,
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.payroll,
    ];
    const obj_before = deductionData;
    const obj_after = response.model;
    const comment = null;

    useActivityMonitor().create(
      action,
      categories,
      obj_before,
      obj_after,
      comment
    );
  }

  return response.model;
}
