import { addFinancialRequestComment } from "./requestsComments/create";
import { getAllComments, getOneComment, getPaginatedComments } from "./requestsComments/get";
// import { removeCommityMember } from "./requestsComments/remove";
// import { updateMember } from "./requestsComments/update";
// import { validateMember } from "./requestsComments/validate";

export function useProjectFinancailCommityComments() {
  return {
    // validate: validateMember,
    create: addFinancialRequestComment,
    get: {
      all: getAllComments,
      paginated: getPaginatedComments,
      one: getOneComment,
    },
    // update: updateMember,
    // remove: removeCommityMember,
  };
}
