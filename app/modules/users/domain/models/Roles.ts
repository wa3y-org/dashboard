import type { Permission } from "./Permissions";

type RoleJson = {
  id: string;
  title: string;
  description?: string;
  permissions?: Permission[];
};

export class Role {
  public readonly id: string;
  public title: string;
  public description: string;
  public permissions?: Permission[] = [];

  constructor(
    id: string = "",
    title: string = "",
    description: string = "",
    permissions: Permission[] = []
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.permissions = permissions;
  }

  public static fromJson(data: RoleJson) {
    const id = data.id;
    const title = data.title;
    const description = data.description || "";
    const permissions = data.permissions || [];

    return new Role(id, title, description, permissions);
  }
}
