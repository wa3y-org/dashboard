import type { BaseModel, RecordModel } from "pocketbase";
import type { PayrollRecord, PayrollResponse } from "~/app/pocketbase-types";

export type TPayroll = PayrollRecord &
  PayrollResponse &
  RecordModel &
  BaseModel;

export const PayrollCollection = usePocketBase().collection("payroll");
