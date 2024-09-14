import { backendRequestMultiple } from "~/app/core/BackendRequest";
import type { TProject } from "../projects/index";
import { ProjectFinanceCollection, type TProjectFinance } from "./index";
import { ProjectFinanceTypeOptions } from "~/app/pocketbase-types";

export async function getProjectDonations(project: TProject) {
  return await getProjectFinance(project, ProjectFinanceTypeOptions.donation);
}

export async function getProjectExpenses(project: TProject) {
  return await getProjectFinance(project, ProjectFinanceTypeOptions.expense);
}

export async function getProjectFinance(
  project: TProject,
  type: ProjectFinanceTypeOptions
) {
  return await backendRequestMultiple<TProjectFinance>(async () => {
    return await ProjectFinanceCollection.getFullList({
      filter: `
        project="${project.id}"
        &&
        type="${type}"
      `,
    });
  });
}
