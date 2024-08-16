import { Model, type ModelJson } from "./Model";
import type { Role } from "./Roles";

export enum UserStatus {
  Active = "ACTIVE",
  Suspended = "SUSPENDED",
}

export type UserProps = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  email: string;
  name: string;
  avatar?: string | File;
  verified: boolean;
  bio?: string;
  roles?: Role[];
  status: UserStatus;
};

export const NewUserDefaultPassword = "12345678";

export class User extends Model {
  public email: string;
  public name: string;
  public avatar?: string | File;
  public verified: boolean;
  public bio?: string;
  public roles: Role[];
  public status: UserStatus;

  constructor(props: UserProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
    this.email = props.email;
    this.name = props.name;
    this.avatar = props.avatar;
    this.verified = props.verified;
    this.bio = props.bio;
    this.roles = props.roles || [];
    this.status = props.status;
  }
}
