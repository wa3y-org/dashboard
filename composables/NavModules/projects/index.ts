import type { NavGroup, NavModule } from "../types";
import { projectsRoutes } from "./projects";

const projectsModuleChildren: NavGroup[] = [projectsRoutes];

export const ProjectsModule: NavModule = {
  name: "Projects",
  icon: "mdi-folder-open-outline",
  route: "/projects",
  permissions: [],
  children: projectsModuleChildren,
};
