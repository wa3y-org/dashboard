import type { NavGroup, NavModule } from "../types";
import { websiteRoutes } from "./website";

const WebsiteModuleChildren: NavGroup[] = [websiteRoutes];

export const WebsiteModule: NavModule = {
  name: "Website",
  icon: "mdi-web",
  route: "/manage-website",
  permissions: [],
  children: WebsiteModuleChildren,
};
