import type { Permission } from "./Permissions";

type RoleJson = {
  id: string;
  title: string;
  description?: string;
  permissions?: Permission[];
  createdAt?: Date;
  updatedAt?: Date;
};

export class Role {
  public readonly id: string;
  public title: string;
  public description?: string;
  public permissions?: Permission[] = [];
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data: RoleJson) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description || "";
    this.permissions = data.permissions || [];
    this.createdAt = data.createdAt;
    this.updatedAt = data.createdAt;
  }

  public static fromJson(data: RoleJson) {
    return new Role(data);
  }
}
