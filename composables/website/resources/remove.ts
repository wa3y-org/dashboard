import { backendRequestOne } from "~/app/core/BackendRequest";
import { WebsiteResourcesCollection, type TWebsiteResource } from "./index";

export async function removeWebResource(resource: TWebsiteResource) {
  return await backendRequestOne<TWebsiteResource>(async () => {
    return await WebsiteResourcesCollection.delete(resource.id);
  });
}

export async function removeWebResourceAttachment(
  resource: TWebsiteResource,
  attachment: string
) {
  return await backendRequestOne<TWebsiteResource>(async () => {
    return await WebsiteResourcesCollection.update(resource.id, {
      "attachments-": attachment,
    });
  });
}
