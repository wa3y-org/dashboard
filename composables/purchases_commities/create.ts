import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  ProjectPurchasesComitiesCollection,
  type TProjectPurchasesComity,
} from "./index";
import { UserActivitiesActionOptions, UserActivitiesCategoriesOptions } from "~/app/pocketbase-types";

export async function addMember(
  member: TProjectPurchasesComity,
  project_id: string
) {
  const response = await backendRequestOne<TProjectPurchasesComity>(
    async () => {
      return await ProjectPurchasesComitiesCollection.create(
        Object.assign({ project: project_id }, member)
      );
    }
  );

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.projects,
      UserActivitiesCategoriesOptions.hr,
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
