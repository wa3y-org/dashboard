import { backendRequestOne } from "~/app/core/BackendRequest";
import { EmployeesTasksCollection, type TEmployeesTasks } from "./index";

export async function addTask(task: TEmployeesTasks, employee_id: string) {
  return await backendRequestOne<TEmployeesTasks>(async () => {
    return await EmployeesTasksCollection.create(Object.assign({ "employee": employee_id }, task));
  });
}
