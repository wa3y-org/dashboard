import type { Role } from "./Roles";

export enum UserStatus {
  Active = "ACTIVE",
  Suspended = "SUSPENDED",
}

export class User {
  public readonly id: string;
  public name: string;
  public userName: string;
  public email: string = "";
  public avatar: string = "";
  public status: UserStatus = UserStatus.Suspended;
  public createdAt: Date;
  public updatedAt: Date;
  public roles: Role[] = [];

  constructor(
    id: string,
    userName: string,
    name: string,
    created: Date,
    updated: Date
  ) {
    this.id = id;
    this.userName = userName;
    this.name = name;
    this.createdAt = created;
    this.updatedAt = updated;
  }
}
