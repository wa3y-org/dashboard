import { setUserActivity } from "./activityMonitor/create";
import {
  getAllActions,
  getPaginatedActions,
  getPaginatedActionsByCategories,
} from "./activityMonitor/get";

export function useActivityMonitor() {
  return {
    get: {
      all: getAllActions,
      paginated: {
        getPaginatedActions,
        byCategories: getPaginatedActionsByCategories,
      },
    },
    create: setUserActivity
  };
}
