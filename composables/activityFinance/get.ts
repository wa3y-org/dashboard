import { backendRequestMultiple } from "~/app/core/BackendRequest";
import type { TActivity } from "../activities";
import { ActivitiesFinanceTypeOptions } from "~/app/pocketbase-types";
import { ActivityFinanceCollection, type TActivityFinance } from "./index";

export async function getActivityDonations(activity: TActivity) {
  return await getActivityFinance(
    activity,
    ActivitiesFinanceTypeOptions.donation
  );
}

export async function getActivityExpenses(activity: TActivity) {
  return await getActivityFinance(
    activity,
    ActivitiesFinanceTypeOptions.expense
  );
}

export async function getActivityFinance(
  activity: TActivity,
  type: ActivitiesFinanceTypeOptions
) {
  return await backendRequestMultiple<TActivityFinance>(async () => {
    return await ActivityFinanceCollection.getFullList({
      filter: `
        activity="${activity.id}"
        &&
        type="${type}"
      `,
    });
  });
}
