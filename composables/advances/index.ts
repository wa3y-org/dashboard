import type { BaseModel, RecordModel } from "pocketbase";
import type {
  EmployeesAdvancesPaymentsRecord,
  EmployeesAdvancesPaymentsResponse,
  EmployeesAdvancesRecord,
  EmployeesAdvancesResponse,
} from "~/app/pocketbase-types";

export type TAdvance = EmployeesAdvancesRecord &
  EmployeesAdvancesResponse &
  RecordModel &
  BaseModel;

export type TAdvancePayment = EmployeesAdvancesPaymentsRecord &
  EmployeesAdvancesPaymentsResponse &
  RecordModel &
  BaseModel;

export const EmployeesAdvancesCollection =
  usePocketBase().collection("employees_advances");

export const EmployeesAdvancesPaymentsCollection = usePocketBase().collection(
  "employees_advances_payments"
);
