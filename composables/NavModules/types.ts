export interface NavItem {
  name: string;
  icon: string;
  route: string;
  permissions: string[];
}

export type NavGroup = NavItem[]

export interface NavModule extends NavItem {
  children: NavGroup[];
}
