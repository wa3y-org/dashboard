import type { BaseModel, RecordModel } from "pocketbase";
import type { EmployeesAdvancesRecord, EmployeesAdvancesResponse } from "~/app/pocketbase-types";

export type TAdvance = EmployeesAdvancesRecord & EmployeesAdvancesResponse & RecordModel & BaseModel;

export const EmployeesAdvancesCollection = usePocketBase().collection('employees_advances');
