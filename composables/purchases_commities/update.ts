import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  ProjectPurchasesComitiesCollection,
  type TProjectPurchasesComity,
} from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function updateMember(member: TProjectPurchasesComity) {
  const Data = await ProjectPurchasesComitiesCollection.getOne(member.id);
  const response = await backendRequestOne<TProjectPurchasesComity>(
    async () => {
      return await ProjectPurchasesComitiesCollection.update(
        member.id,
        Object.assign({}, member)
      );
    }
  );

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.UPDATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.projects,
      UserActivitiesCategoriesOptions.hr,
    ];
    const obj_before = Data;
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
