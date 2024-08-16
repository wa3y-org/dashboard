import type { RecordModel } from "pocketbase";
import {
  NewUserDefaultPassword,
  User,
  UserStatus,
  type UserProps,
} from "../../../domain/models/User";
import type {
  AuthResponse,
  IUsersRepository,
} from "../../../domain/ports/UserRepository";
import { pb } from "./Connection";
import type { OneModelResponse } from "../../../domain/ports/CRUDRepository";
import { BackendError } from "../../../services/BackendError";

export class PocketBaseUserRepository implements IUsersRepository {
  // single instance to implement singleton Design pattern
  static #instance: PocketBaseUserRepository;

  public static get instance(): PocketBaseUserRepository {
    if (!PocketBaseUserRepository.#instance) {
      PocketBaseUserRepository.#instance = new PocketBaseUserRepository();
    }

    return PocketBaseUserRepository.#instance;
  }

  private static createUserFromAuthModel(userModel: RecordModel): User {
    const userProps: UserProps = {
      id: userModel.id,
      createdAt: new Date(userModel.created),
      updatedAt: new Date(userModel.updated),
      email: userModel.email,
      name: userModel.name,
      status: userModel.status,
      verified: userModel.verified,
      avatar: userModel.avatar,
      bio: userModel.bio,
    };
    const user = new User(userProps);
    user.email = userModel.email || "";
    user.avatar = pb.files.getUrl(userModel, userModel.avatar) || "";
    user.status = userModel.status || UserStatus.Suspended;
    return user;
  }

  public async authWithCredentials(
    identity: string,
    password: string
  ): Promise<AuthResponse> {
    const authData = await pb
      .collection("users")
      .authWithPassword(identity, password);
    return {
      user: PocketBaseUserRepository.createUserFromAuthModel(authData.record),
      token: authData.token,
    };
  }

  public async singOut(): Promise<void> {
    pb.authStore.clear();
  }

  async create(user: User): Promise<OneModelResponse<User>> {
    const response: OneModelResponse<User> = {
      model: null,
      error: null,
    };

    const rolesIds: string[] = [];
    user.roles.forEach((role) => rolesIds.push(role.id));
    

    
    const data = new FormData();
    data.append("email", user.email);
    data.append("emailVisibility", "true");
    data.append("name", user.name);
    data.append("bio", user.bio || "");
    data.append("status", user.status);
    data.append("password", NewUserDefaultPassword);
    data.append("passwordConfirm", NewUserDefaultPassword);

    for (let id of rolesIds) {
      data.append("roles", id);

    }
    if (user.avatar instanceof File) {
      data.append("avatar", user.avatar);
    }

    try {
      const record = await pb
        .collection("users")
        .create(data, { expand: "roles" });

      response.error = null;
      response.model = PocketBaseUserRepository.createUserFromAuthModel(record);
    } catch (e: any) {
      response.model = null;
      response.error = new BackendError(e.response.message, e.response.code);
    }
    return response;
  }
}
