import { backendRequestOne } from "~/app/core/BackendRequest";
import { EmployeesTasksCollection, type TEmployeesTasks } from "./index";

export async function removeTask(task: TEmployeesTasks) {
  return await backendRequestOne<TEmployeesTasks>(async () => {
    return await EmployeesTasksCollection.delete(task.id);
  });
}
