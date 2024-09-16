
import type { OneModelResponse } from "~/app/core/CRUDRepository";
import { backendRequestOne } from "~/app/core/BackendRequest";
import type { TActivity } from "../activities";
import { ActivityFinanceCollection, type TActivityFinance } from "./index";

export async function addActivityFinance(
  activity: TActivity,
  finance: TActivityFinance
): Promise<OneModelResponse<TActivityFinance>> {
  async function activityFinanceCreator() {
    return await ActivityFinanceCollection.create({
      activity: activity.id,
      fund_facility: finance.fund_facility,
      amount: finance.amount,
      statement: finance.statement,
      type: finance.type,
    });
  }


  return await backendRequestOne<TActivityFinance>(activityFinanceCreator);
}
