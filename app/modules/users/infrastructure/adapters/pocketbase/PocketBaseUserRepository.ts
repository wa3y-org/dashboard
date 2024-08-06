import type { RecordModel } from "pocketbase";
import { User, UserStatus } from "../../../domain/models/User";
import type {
  AuthResponse,
  IUserRepository,
} from "../../../domain/ports/UserRepository";
import { pb } from "./Connection";

export class PocketBaseUserRepository implements IUserRepository {
  // single instance to implement singleton Design pattern
  static #instance: PocketBaseUserRepository;

  public static get instance(): PocketBaseUserRepository {
    if (!PocketBaseUserRepository.#instance) {
      PocketBaseUserRepository.#instance = new PocketBaseUserRepository();
    }

    return PocketBaseUserRepository.#instance;
  }

  private createUserFromAuthModel(userModel: RecordModel): User {
    const user = new User(
      userModel.id,
      userModel.userName,
      userModel.name,
      new Date(userModel.created),
      new Date(userModel.updated)
    );
    user.email = userModel.email || "";
    user.avatar = pb.files.getUrl(userModel, userModel.avatar) || "";
    user.status = userModel.status || UserStatus.Suspended;
    console.log(user);
    alert();
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
      user: this.createUserFromAuthModel(authData.record),
      token: authData.token,
    };
  }

  public async singOut(): Promise<void> {
    pb.authStore.clear();
  }
}
