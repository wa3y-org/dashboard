import type { BaseModel } from "pocketbase";
import type { EmployeesTasksRecord, EmployeesTasksResponse } from "~/app/pocketbase-types";

export type TEmployeesTasks = EmployeesTasksRecord & EmployeesTasksResponse & BaseModel;
export const EmployeesTasksCollection = usePocketBase().collection('employees_tasks');
export const tasksPerPage = 10;