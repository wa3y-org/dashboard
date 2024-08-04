import type { User } from "../models/User";

export type AuthResponse = {
  user: User;
  token: string;
};
export interface UserRepository {
  /**
   * send login request to backend
   * @param identity : string user_name or email
   * @param password : string password
   */
  authWithCredentials(
    identity: string,
    password: string
  ): Promise<AuthResponse>;

  singOut(): Promise<void>;
}
