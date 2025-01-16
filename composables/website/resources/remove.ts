import { backendRequestOne } from "~/app/core/BackendRequest";
import { WebsiteResourcesCollection, type TWebsiteResource } from "./index";
import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
} from "~/app/pocketbase-types";
import { updateWebResource } from "./update";

export async function removeWebResource(resource: TWebsiteResource) {
  const Data = await WebsiteResourcesCollection.getOne(resource.id);
  const response = await backendRequestOne<TWebsiteResource>(async () => {
    return await WebsiteResourcesCollection.delete(resource.id);
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.DELETE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.website,
      UserActivitiesCategoriesOptions.web_resources,
    ];
    const obj_before = Data;
    const obj_after = null;
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

export async function removeWebResourceAttachment(
  resource: TWebsiteResource,
  attachment: string
) {
  return await updateWebResource({
    id: resource.id,
    "attachments-": attachment,
  });
}
