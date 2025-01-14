import { backendRequestOne } from "~/app/core/BackendRequest";
import { WebsiteResourcesCollection, type TWebsiteResource } from "./index";

export async function updateWebResource(resource: TWebsiteResource) {
  return await backendRequestOne<TWebsiteResource>(async () => {
    return await WebsiteResourcesCollection.update(
      resource.id,
      Object.assign({}, resource)
    );
  });
}
