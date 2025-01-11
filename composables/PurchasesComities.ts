import { addMember } from "./purchases_commities/create";
import { getAllCommityMembers, getOneCommityMember } from "./purchases_commities/get";
import { removeCommityMember } from "./purchases_commities/remove";
import { updateMember } from "./purchases_commities/update";
import { validateMember } from "./purchases_commities/validate";

export function useProjectPurchasesComity() {
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
