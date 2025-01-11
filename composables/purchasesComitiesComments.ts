import { addPurchasesRequestComment } from "./purchasesComments /create";
import { getAllComments, getOneComment, getPaginatedComments } from "./purchasesComments /get";
// import { removeCommityMember } from "./purchasesComments /remove";
// import { updateMember } from "./purchasesComments /update";
// import { validateMember } from "./purchasesComments /validate";

export function useProjectPurchasesComityComments() {
  return {
    // validate: validateMember,
    create: addPurchasesRequestComment,
    get: {
      all: getAllComments,
      paginated: getPaginatedComments,
      one: getOneComment,
    },
    // update: updateMember,
    // remove: removeCommityMember,
  };
}
