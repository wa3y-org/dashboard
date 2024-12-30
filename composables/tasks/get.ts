import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";
import { EmployeesTasksCollection, tasksPerPage, type TEmployeesTasks } from "./index";

export async function getEmployeeTasks(employee_id: string, page: number = 1) {
  return await backendRequestMultiple<TEmployeesTasks>(async () => {
    return await EmployeesTasksCollection.getList(page, tasksPerPage, {
      filter: `
        employee="${employee_id}"
      `,
      sort: "complition_date",
    });
  });
}

export async function getOneAsset(id: string) {
  return await backendRequestOne<TEmployeesTasks>(async () => {
    return await EmployeesTasksCollection.getOne(id);
  });
}
