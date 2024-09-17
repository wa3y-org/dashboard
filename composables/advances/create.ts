import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  EmployeesAdvancesCollection,
  EmployeesAdvancesPaymentsCollection,
  type TAdvance,
  type TAdvancePayment,
} from "./index";
import type {
  EmployeesRecord,
  EmployeesResponse,
} from "~/app/pocketbase-types";
import type { AuthModel } from "pocketbase";
import { updateEmployeeAdvance } from "./update";

type TEmployee = EmployeesRecord & EmployeesResponse & AuthModel;

export async function addEmployeeAdvance(
  employee: TEmployee,
  advance: TAdvance
) {
  return await backendRequestOne<TAdvance>(async () => {
    return await EmployeesAdvancesCollection.create({
      employee: employee.id,
      amount: advance.amount,
      payed: 0,
      statement: advance.statement,
    });
  });
}

export async function addEmployeeAdvancePayment(
  advance: TAdvance,
  payment: TAdvancePayment
) {
  return await backendRequestOne<TAdvancePayment>(async () => {
    const response = await EmployeesAdvancesPaymentsCollection.create({
      advance: advance.id,
      amount: payment.amount,
      statement: payment.statement,
    });

    await EmployeesAdvancesCollection.update(advance.id, {
      "payed+": `${payment.amount}`,
    });

    return response;
  });
}
