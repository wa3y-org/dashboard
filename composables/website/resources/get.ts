import {
  backendRequestMultiple,
  backendRequestOne,
} from "~/app/core/BackendRequest";
import { WebsiteResourcesCollection, type TWebsiteResource } from "./index";

export async function getAllWebResources() {
  return await backendRequestMultiple<TWebsiteResource>(async () => {
    return await WebsiteResourcesCollection.getFullList();
  });
}

export async function getOneWebResource(id: string) {
  return await backendRequestOne<TWebsiteResource>(async () => {
    return await WebsiteResourcesCollection.getOne(id);
  });
}

export async function getWebResourcesByTag(tag: string) {
  return await backendRequestMultiple<TWebsiteResource>(async () => {
    return await WebsiteResourcesCollection.getFullList({
      filter: `
        tags ~ "${tag}"
      `,
    });
  });
}
