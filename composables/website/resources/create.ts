import { backendRequestOne } from "~/app/core/BackendRequest";
import { WebsiteResourcesCollection, type TWebsiteResource } from "./index";

export async function addWebResource(resource: TWebsiteResource) {
  return await backendRequestOne<TWebsiteResource>(async () => {
    return await WebsiteResourcesCollection.create(Object.assign(resource));
  });
}
