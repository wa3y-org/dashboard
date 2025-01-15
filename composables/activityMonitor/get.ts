import { backendRequestMultiple } from "~/app/core/BackendRequest";
import {
  activitiesPerPage,
  UserActivitiesCollection,
  type TUserActivity,
} from "./index";

export async function getAllActions() {
  return await backendRequestMultiple<TUserActivity>(async () => {
    return await UserActivitiesCollection.getFullList({
      expand: "employee",
      sort: "-created",
    });
  });
}

export async function getPaginatedActions(page: number = 1) {
  return await backendRequestMultiple<TUserActivity>(async () => {
    return await UserActivitiesCollection.getList(page, activitiesPerPage, {
      expand: "employee",
      sort: "-created",
    });
  });
}
