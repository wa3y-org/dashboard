import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";
import { EmployeesAdvancesCollection, type TAdvance } from "./index";
import type {
  EmployeesRecord,
  EmployeesResponse,
} from "~/app/pocketbase-types";
import type { AuthModel } from "pocketbase";

export async function getAllEmployeesAdvances() {
  return await backendRequestMultiple<TAdvance>(async () => {
    return await EmployeesAdvancesCollection.getFullList({
      sort: "-created",
      expand: "employee",
    });
  });
}

export async function getEmployeeOneAdvance(id: string) {
  return await backendRequestOne<TAdvance>(async () => {
    return await EmployeesAdvancesCollection.getOne(id, {
      expand: "employee",
    });
  });
}

type TEmployee = EmployeesRecord & EmployeesResponse & AuthModel;

export async function getOneEmployeeAdvances(employee: TEmployee) {
  return await backendRequestOne<TAdvance>(async () => {
    return await EmployeesAdvancesCollection.getFullList({
      filter: `employee="${employee.id}"`,
      expand: "employee",
    });
  });
}
