import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";
import { BankChecksCollection, type TBankCheck } from "./index";

export async function getAllBankChecks(project_id: string) {
  return await backendRequestMultiple<TBankCheck>(async () => {
    return await BankChecksCollection.getFullList({
      filter: `
        project="${project_id}"
      `,
    });
  });
}

export async function getOneBankCheck(id: string) {
  return await backendRequestOne<TBankCheck>(async () => {
    return await BankChecksCollection.getOne(id);
  });
}
