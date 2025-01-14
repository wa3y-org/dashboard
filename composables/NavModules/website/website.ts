import type { NavGroup } from "../types";

export const websiteRoutes: NavGroup = [
  {
    name: "Topics & Articles",
    icon: "mdi-tag-text-outline",
    route: "/manage-website/topics",
    permissions: [],
  },
  {
    name: "Resources",
    icon: "mdi-attachment",
    route: "/manage-website/resources",
    permissions: [],
  },
];
