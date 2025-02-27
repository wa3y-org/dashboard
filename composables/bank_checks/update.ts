import { backendRequestOne } from "~/app/core/BackendRequest";
import { BankChecksCollection, type TBankCheck } from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function updateBankCheck(check: TBankCheck) {
  const checkData = await BankChecksCollection.getOne(check.id);
  const response = await backendRequestOne<TBankCheck>(async () => {
    return await BankChecksCollection.update(
      check.id,
      Object.assign({}, check)
    );
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.UPDATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.projects,
    ];
    const obj_before = checkData;
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

  return response;
}
