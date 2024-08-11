import type { IRolesRepository } from "../domain/ports/RolesRepository";
import type { IUsersRepository } from "../domain/ports/UserRepository";
import { PocketBaseRolesRepository } from "../infrastructure/adapters/pocketbase/PocketBaseRoleRepository";
import { PocketBaseUserRepository } from "../infrastructure/adapters/pocketbase/PocketBaseUserRepository";
import { AuthenticationService } from "./auth/Auth.service";

// remember the order is important some modules depends on each other
const rolesRepository: IRolesRepository = PocketBaseRolesRepository.instance;
const usersRepository: IUsersRepository = PocketBaseUserRepository.instance;
const AuthService: AuthenticationService = AuthenticationService.instance;

export { rolesRepository, usersRepository, AuthService };
