import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
  type EmployeesRecord,
  type EmployeesResponse,
} from "~/app/pocketbase-types";

export async function deleteEmployee(id: string) {
  const employeeData = await usePocketBase().collection("employees").getOne(id);
  const response = await backendRequestOne<EmployeesRecord>(async () => {
    return await usePocketBase().collection("employees").delete(id);
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.employees,
      UserActivitiesCategoriesOptions.hr,
    ];
    const obj_before = employeeData;
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
