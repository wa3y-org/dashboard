import { PocketBaseUserRepository } from "../infrastructure/adapters/pocketbase/PocketBaseUserRepository";

export default {
  userRepository: new PocketBaseUserRepository(),
};
