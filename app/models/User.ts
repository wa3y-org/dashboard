export enum UserStatus {
  Active = "ACTIVE",
  Suspended = "SUSPENDED",
}

export class User {
  public id: string;
  public name: string;
  public userName: string;
  public email: string = "";
  public avatar: string = "";
  public status: UserStatus;
  public creator: User | null = null;
  public createdAt: Date;
  public updatedAt: Date;
}