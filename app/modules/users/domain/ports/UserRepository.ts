import type { User } from "../models/User";

export type AuthResponse = {
  user: User;
  token: string;
};
export interface UserRepository {
  /* 
  @param identity (user name or password or phone number)
  */
  authWithCredentials(
    identity: string,
    password: string
  ): Promise<AuthResponse>;
}
