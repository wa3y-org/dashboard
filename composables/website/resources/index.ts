import type { BaseModel, RecordModel } from "pocketbase";
import type {
  WebsiteResourcesRecord,
  WebsiteResourcesResponse,
} from "~/app/pocketbase-types";

export const WebsiteResourcesCollection =
  usePocketBase().collection("website_resources");

export type TWebsiteResource = RecordModel &
  WebsiteResourcesRecord &
  WebsiteResourcesResponse &
  BaseModel;
