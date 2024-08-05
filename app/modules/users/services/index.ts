import type { IUserRepository } from "../domain/ports/UserRepository";
import { PocketBaseUserRepository } from "../infrastructure/adapters/pocketbase/PocketBaseUserRepository";
import { AuthenticationService } from "./auth/Auth.service";

// remember the order is important some modules depends on each other
const userRepository: IUserRepository = PocketBaseUserRepository.instance;
const AuthService: AuthenticationService = AuthenticationService.instance;

export { userRepository, AuthService };
