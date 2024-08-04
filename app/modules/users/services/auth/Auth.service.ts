import { User } from "../../domain/models/User";
import type {
  AuthResponse,
  UserRepository,
} from "../../domain/ports/UserRepository";
import config from "../config";
import { LoginFailedError } from "./Auth.exceptions";

export const AuthenticatedUserStorageKey = "authenticated-user-data";
export class AuthService {
  private readonly repository: UserRepository;
  static #instance: AuthService;

  public static get instance(): AuthService {
    if (!AuthService.#instance) {
      AuthService.#instance = new AuthService();
    }

    return AuthService.#instance;
  }

  public AuthenticatedUser: User | null = null;

  constructor() {
    this.repository = config.userRepository;
    this.init();
  }

  private init() {
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
}
