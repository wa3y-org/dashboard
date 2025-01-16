import { backendRequestOne } from "~/app/core/BackendRequest";
import { WebsiteResourcesCollection, type TWebsiteResource } from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";

export async function updateWebResource(resource: TWebsiteResource) {
  const Data = await WebsiteResourcesCollection.getOne(resource.id);
  const response = await backendRequestOne<TWebsiteResource>(async () => {
    return await WebsiteResourcesCollection.update(
      resource.id,
      Object.assign({}, resource)
    );
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.UPDATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.website,
      UserActivitiesCategoriesOptions.web_resources,
    ];
    const obj_before = Data;
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
