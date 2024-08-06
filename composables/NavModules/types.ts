export interface NavItem {
  name: string;
  icon: string;
  route: string;
  permissions: string[];
}

export interface NavModule extends NavItem {
  children: NavItem[];
}