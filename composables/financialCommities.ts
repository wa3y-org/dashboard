import { addMember } from "./financial_commities/create";
import { getAllCommityMembers, getOneCommityMember } from "./financial_commities/get";
import { removeCommityMember } from "./financial_commities/remove";
import { updateMember } from "./financial_commities/update";
import { validateMember } from "./financial_commities/validate";

export function useProjectFinancailCommity() {
  return {
    validate: validateMember,
    create: addMember,
    get: {
      all: getAllCommityMembers,
      one: getOneCommityMember,
    },
    update: updateMember,
    remove: removeCommityMember,
  };
}
