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

export async function getPaginatedActionsByCategories(
  page: number = 1,
  categories: string[] = []
) {
  let filter = ``;

  if (categories.length) {
    filter = 'categories ~ "NotExistingCategory" ';
    for (let category of categories) {
      filter += `
        || categories ~ "${category}"
      `;
    }
  }

  return await backendRequestMultiple<TUserActivity>(async () => {
    return await UserActivitiesCollection.getList(page, activitiesPerPage, {
      expand: "employee",
      sort: "-created",
      filter: filter,
    });
  });
}
