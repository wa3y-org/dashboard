import { User } from "../../domain/models/User";
import type {
  AuthResponse,
  UserRepository,
} from "../../domain/ports/UserRepository";
import config from "../config";
import { LoginFailedError } from "./Auth.exceptions";

export const AuthenticatedUserStorageKey = "authenticated-user-data";
/**
 * AuthService class responsible of authenticating user
 */
export class AuthService {
  // the repository used for authentication
  private readonly repository: UserRepository;

  // single instance to implement singleton Design pattern
  static #instance: AuthService;

  public static get instance(): AuthService {
    if (!AuthService.#instance) {
      AuthService.#instance = new AuthService();
    }

    return AuthService.#instance;
  }

  // the current authenticated user
  public AuthenticatedUser: User | null = null;

  constructor() {
    this.repository = config.userRepository;
    this.init();
  }

  /**
   * initialize the authentication service
   * do stuff like loading the authenticated user from the storage
   */
  private init() {
    // try to load the authenticated user form session storage
    const authData = this.retrieveAuthFromSessionStorage();
    if (!authData) return;

    const storedUser = authData.user;
    this.AuthenticatedUser = new User(
      storedUser.id,
      storedUser.userName,
      storedUser.name,
      new Date(storedUser.createdAt),
      new Date(storedUser.updatedAt)
    );

    this.AuthenticatedUser.email = storedUser.email;
    this.AuthenticatedUser.avatar = storedUser.avatar;
    this.AuthenticatedUser.roles = storedUser.roles;
  }

  /**
   * Attempt to authenticate user by regular credentials
   * @param identity : string user name or email or id
   * @param password : string password
   * @returns the authenticated user or LoginFailedError
   */
  public async login(
    identity: string,
    password: string
  ): Promise<{ user: User | null; error: LoginFailedError | null }> {
    try {
      const { user, token } = await this.repository.authWithCredentials(
        identity,
        password
      );
      this.AuthenticatedUser = user;
      this.storeAuthToSessionStorage({ user, token });
      return { user: this.AuthenticatedUser, error: null };
    } catch (e) {
      return { user: null, error: new LoginFailedError() };
    }
  }

  /**
   * Check whether or not there is an authenticated user
   */
  public get isAuthenticated(): boolean {
    return this.AuthenticatedUser instanceof User;
  }

  private storeAuthToSessionStorage(authData: AuthResponse) {
    window.sessionStorage.setItem(
      AuthenticatedUserStorageKey,
      JSON.stringify(authData)
    );
  }

  private retrieveAuthFromSessionStorage(): AuthResponse | null {
    const authData = sessionStorage.getItem(AuthenticatedUserStorageKey);
    if (!authData) return null;

    return JSON.parse(authData);
  }

  private clearAuthFromSessionStorage() {
    window.sessionStorage.removeItem(AuthenticatedUserStorageKey);
  }

  public async logout(): Promise<void> {
    await this.repository.singOut();
    this.clearAuthFromSessionStorage();
  }
}
