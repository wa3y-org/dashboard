import type { RecordModel } from "pocketbase";
import { User, UserStatus } from "../../../domain/models/User";
import type {
  AuthResponse,
  UserRepository,
} from "../../../domain/ports/UserRepository";
import { pb } from "./Connection";

export class PocketBaseUserRepository implements UserRepository {
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

  private createUserFromAuthModel(userModel: RecordModel): User {
    const user = new User(
      userModel.id,
      userModel.userName,
      userModel.name,
      new Date(userModel.created),
      new Date(userModel.updated)
    );
    user.email = userModel.email || "";
    user.avatar = userModel.avatar || "";
    user.status = userModel.status || UserStatus.Suspended;
    return user;
  }
}
