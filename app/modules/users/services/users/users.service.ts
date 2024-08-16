import { usersRepository } from "..";
import type { Role } from "../../domain/models/Roles";
import { User, UserStatus } from "../../domain/models/User";
import type { IUsersRepository } from "../../domain/ports/UserRepository";

type CreateUserProps = {
  avatar?: string | File;
  name: string;
  email: string;
  bio: string | null;
  roles: Set<Role>;
};

export class UsersService {
  // the repository used for authentication
  private readonly repository: IUsersRepository = usersRepository;

  // single instance to implement singleton Design pattern
  static #instance: UsersService;

  public static get instance(): UsersService {
    if (!UsersService.#instance) {
      UsersService.#instance = new UsersService();
    }

    return UsersService.#instance;
  }

  public async createNewUser(userProps: CreateUserProps) {
    const roles: Role[] = [];
    userProps.roles.forEach((role) => {
      roles.push(role);
    });
    
    const user = new User({
      name: userProps.name,
      email: userProps.email,
      status: UserStatus.Suspended,
      verified: false,
      bio: userProps.bio || "",
      roles,
      avatar: userProps.avatar
    });
    return await this.repository.create(user);
  }
}

export default UsersService.instance;
