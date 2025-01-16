import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
  type MembersRecord,
} from "~/app/pocketbase-types";

export async function deleteMember(id: string) {
  const memberData = await usePocketBase().collection("members").getOne(id);
  const response = await backendRequestOne<MembersRecord>(async () => {
    return await usePocketBase().collection("members").delete(id);
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.members,
      UserActivitiesCategoriesOptions.hr,
    ];
    const obj_before = memberData;
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
