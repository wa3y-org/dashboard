import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
  type VolunteersRecord,
} from "~/app/pocketbase-types";

export async function deleteVolunteer(id: string) {
  // return await usePocketBase().collection("volunteers").delete(id);

  const volunteerData = await usePocketBase()
    .collection("volunteers")
    .getOne(id);
  const response = await backendRequestOne<VolunteersRecord>(async () => {
    return await usePocketBase().collection("volunteers").delete(id);
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.volunteers,
      UserActivitiesCategoriesOptions.hr,
    ];
    const obj_before = volunteerData;
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
