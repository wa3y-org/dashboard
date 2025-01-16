import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  ProjectFinancialCommitiesCollection,
  type TProjectFinancialCommity,
} from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function removeCommityMember(member: TProjectFinancialCommity) {
  const memberData = await ProjectFinancialCommitiesCollection.getOne(
    member.id
  );
  const response = await backendRequestOne<TProjectFinancialCommity>(
    async () => {
      return await ProjectFinancialCommitiesCollection.delete(member.id);
    }
  );

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.projects,
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

  return response;
}
