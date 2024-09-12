import { createActivity } from "./activities/create";
import { getAllActivities, getOneActivity } from "./activities/get";
import { removeActivity } from "./activities/remove";
import { updateActivity } from "./activities/update";
import { validateActivity } from "./activities/validateActivity";

export function useActivities() {
  return {
    validate: validateActivity,
    create: createActivity,
    getAll: getAllActivities,
    getOne: getOneActivity,
    update: updateActivity,
    remove: removeActivity
  };
}
