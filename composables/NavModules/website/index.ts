import type { NavGroup, NavModule } from "../types";

const WebsiteModuleChildren: NavGroup[] = [];

export const WebsiteModule: NavModule = {
  name: "Website",
  icon: "mdi-web",
  route: "/manage-website",
  permissions: [],
  children: WebsiteModuleChildren,
};
