import { addWebResource } from "./website/resources/create";
import {
  getAllWebResources,
  getOneWebResource,
  getWebResourcesByTag,
} from "./website/resources/get";
import { removeWebResource, removeWebResourceAttachment } from "./website/resources/remove";
import { updateWebResource } from "./website/resources/update";
import { validateWebResource } from "./website/resources/validate";

export function useWebResources() {
  return {
    create: addWebResource,
    update: updateWebResource,
    remove: removeWebResource,
    validate: validateWebResource,
    get: {
      all: getAllWebResources,
      byId: getOneWebResource,
      byTag: getWebResourcesByTag,
    },
    attachments: {
      remove: removeWebResourceAttachment,
    }
  };
}
