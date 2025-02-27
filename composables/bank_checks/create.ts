import { backendRequestOne } from "~/app/core/BackendRequest";
import { BankChecksCollection, type TBankCheck } from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function addBankCheck(
  check: TBankCheck,
  project_id: string
) {
  const response = await backendRequestOne<TBankCheck>(async () => {
    return await BankChecksCollection.create(
      Object.assign({ project: project_id }, check)
    );
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.projects,
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

  return response;
}
