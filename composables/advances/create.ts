import { backendRequestOne } from "~/app/core/BackendRequest";
import {
  EmployeesAdvancesCollection,
  EmployeesAdvancesPaymentsCollection,
  type TAdvance,
  type TAdvancePayment,
} from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
  type EmployeesRecord,
  type EmployeesResponse,
} from "~/app/pocketbase-types";
import type { AuthModel } from "pocketbase";
import { updateEmployeeAdvance } from "./update";

type TEmployee = EmployeesRecord & EmployeesResponse & AuthModel;

export async function addEmployeeAdvance(
  employee: TEmployee,
  advance: TAdvance
) {
  const response = await backendRequestOne<TAdvance>(async () => {
    return await EmployeesAdvancesCollection.create({
      employee: employee.id,
      amount: advance.amount,
      payed: 0,
      deduction: advance.deduction,
      statement: advance.statement,
    });
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.expenses,
      UserActivitiesCategoriesOptions.advances,
      UserActivitiesCategoriesOptions.employees,
    ];
    const obj_before = null;
    const obj_after = response.model;
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

export async function addEmployeeAdvancePayment(
  advance: TAdvance,
  payment: TAdvancePayment
) {
  const response = await backendRequestOne<TAdvancePayment>(async () => {
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

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.finance,
      UserActivitiesCategoriesOptions.advances,
      UserActivitiesCategoriesOptions.employees,
      UserActivitiesCategoriesOptions.deductions,
      UserActivitiesCategoriesOptions.payroll,
    ];
    const obj_before = null;
    const obj_after = response.model;
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
