import { backendRequestOne } from "~/app/core/BackendRequest";
import { WebsiteResourcesCollection, type TWebsiteResource } from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function addWebResource(resource: TWebsiteResource) {
  const response = await backendRequestOne<TWebsiteResource>(async () => {
    return await WebsiteResourcesCollection.create(Object.assign(resource));
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.website,
      UserActivitiesCategoriesOptions.web_resources,
    ];
    const obj_before = null;
    const obj_after = response.model;
    const comment = null;

    useActivityMonitor().create(
      action,
      categories,
      obj_before,
      obj_after,
      comment
    );
  }

  return response;
}
