import { backendRequestOne } from "~/app/core/BackendRequest";
import { EmployeesTasksCollection, type TEmployeesTasks } from "./index";

export async function updateTask(task: TEmployeesTasks, task_id: string) {
  return await backendRequestOne<TEmployeesTasks>(async () => {
    return await EmployeesTasksCollection.update(task_id, task);
  });
}
