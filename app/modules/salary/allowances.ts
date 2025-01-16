import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
  type AllowanceOptionsRecord,
} from "~/app/pocketbase-types";

const pb = usePocketBase();

export async function getAllowances() {
  const records = await pb.collection("allowance_options").getFullList({
    sort: "-created",
  });

  return records;
}

export async function deleteAllowance(id: string) {
  const allowanceData = await usePocketBase()
    .collection("allowance_options")
    .getOne(id);
  const response = await backendRequestOne<AllowanceOptionsRecord>(async () => {
    return await pb.collection("allowance_options").delete(id);
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.allowances,
      UserActivitiesCategoriesOptions.hr,
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.payroll,
    ];
    const obj_before = allowanceData;
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

export async function storeAllowance(allowance: AllowanceOptionsRecord) {
  const response = await backendRequestOne<AllowanceOptionsRecord>(async () => {
    return await pb.collection("allowance_options").create(allowance);
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.allowances,
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

export async function updateAllowance(allowance: AllowanceOptionsRecord) {
  const allowanceData = await usePocketBase()
    .collection("allowance_options")
    .getOne(allowance.id);
  const response = await backendRequestOne<AllowanceOptionsRecord>(async () => {
    return await pb
      .collection("allowance_options")
      .update(allowance.id, allowance);
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.UPDATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.allowances,
      UserActivitiesCategoriesOptions.hr,
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.payroll,
    ];
    const obj_before = allowanceData;
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
