import type { RecordModel } from "pocketbase";
import type { Permission } from "../../../domain/models/Permissions";
import { Role } from "../../../domain/models/Roles";
import type {
  CreateRoleResponse,
  FetchOneRoleResponse,
  FetchRolesListResponse,
  IRolesRepository,
} from "../../../domain/ports/RolesRepository";
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

  public static recordToRole(record: RecordModel): Role {
    return Role.fromJson({
      id: record.id,
      title: record.title,
      description: record.description,
      permissions: record.permissions,
      createdAt: new Date(record.created),
      updatedAt: new Date(record.updated),
    });
  }

  async create(
    title: string,
    description: string,
    permissions: Set<Permission>
  ): Promise<CreateRoleResponse> {
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
      const role = PocketBaseRolesRepository.recordToRole(record);
      return { role, error: null };
    } catch (e: any) {
      return {
        role: null,
        error: new BackendError(e.response.message, e.response.code),
      };
    }
  }

  async fetchAll(): Promise<FetchRolesListResponse> {
    let roles: Role[] | null = [];
    let error: BackendError | null = null;

    try {
      const records = await pb.collection("roles").getFullList({
        sort: "-created",
      });

      roles = [];
      records.forEach((record) => {
        roles?.push(PocketBaseRolesRepository.recordToRole(record));
      });
    } catch (e: any) {
      roles = null;
      error = new BackendError(e.response.message, e.response.code);
    }

    const response = {
      roles,
      error,
    };

    return response;
  }

  async fetchOne(id: string): Promise<FetchOneRoleResponse> {
    let role: Role | null = null;
    let error: BackendError | null = null;
    try {
      const record = await pb.collection("roles").getOne(id);
      role = PocketBaseRolesRepository.recordToRole(record);
    } catch (e: any) {
      role = null;
      error = new BackendError(e.response.message, e.response.code);
    }
    return { role, error };
  }
}
