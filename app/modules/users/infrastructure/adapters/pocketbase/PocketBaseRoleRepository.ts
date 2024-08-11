import type { Permission } from "../../../domain/models/Permissions";
import { Role } from "../../../domain/models/Roles";
import type { IRolesRepository } from "../../../domain/ports/RolesRepository";
import { BackendError } from "../../../services/BackendError";
import { pb } from "./Connection";

export class PocketBaseRolesRepository implements IRolesRepository {
  // single instance to implement singleton Design pattern
  static #instance: PocketBaseRolesRepository;

  public static get instance(): PocketBaseRolesRepository {
    if (!PocketBaseRolesRepository.#instance) {
      PocketBaseRolesRepository.#instance = new PocketBaseRolesRepository();
    }

    return PocketBaseRolesRepository.#instance;
  }

  async create(
    title: string,
    description: string,
    permissions: Set<Permission>
  ): Promise<{ role: Role | null; error: BackendError | null }> {
    const permissionsArray: Permission[] = [];
    for (let p of permissions) {
      permissionsArray.push(p);
    }

    const data = {
      title,
      description,
      permissions: permissionsArray,
    };

    try {
      const record = await pb.collection("roles").create(data);
      const role = Role.fromJson({
        id: record.id,
        title: record.title,
      });
      return { role, error: null };
    } catch (e: any) {
      return {
        role: null,
        error: new BackendError(e.response.message, e.response.code),
      };
    }
  }
}
