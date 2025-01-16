import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  ProjectPurchasesComitiesCollection,
  type TProjectPurchasesComity,
} from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function removeCommityMember(member: TProjectPurchasesComity) {
  const Data = await ProjectPurchasesComitiesCollection.getOne(member.id);
  const response = await backendRequestOne<TProjectPurchasesComity>(
    async () => {
      return await ProjectPurchasesComitiesCollection.delete(member.id);
    }
  );

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.projects,
      UserActivitiesCategoriesOptions.hr,
    ];
    const obj_before = Data;
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

  return response;
}
