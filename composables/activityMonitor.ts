import { getAllActions, getPaginatedActions } from "./activityMonitor/get";

export function useActivityMonitor() {
  return {
    get: {
      all: getAllActions,
      paginated: getPaginatedActions,
    },
  };
}
