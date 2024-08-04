import { User } from "../../domain/models/User";
import type { UserRepository } from "../../domain/ports/UserRepository";
import config from "../config";
import { LoginFailedError } from "./Auth.exceptions";

export class AuthService {
  private readonly repository: UserRepository;
  static #instance: AuthService;

  constructor() {
    this.repository = config.userRepository;
  }

  public static get instance(): AuthService {
    if (!AuthService.#instance) {
      AuthService.#instance = new AuthService();
    }

    return AuthService.#instance;
  }

  public AuthenticatedUser: User | null = null;

  public async login(
    identity: string,
    password: string
  ): Promise<{ user: User | null; error: LoginFailedError | null }> {
    try {
      const { user } = await this.repository.authWithCredentials(
        identity,
        password
      );
      this.AuthenticatedUser = user;
      return { user: this.AuthenticatedUser, error: null };
    } catch (e) {
      return { user: null, error: new LoginFailedError() };
    }
  }

  public get isAuthenticated(): boolean {
    return this.AuthenticatedUser instanceof User;
  }
}
