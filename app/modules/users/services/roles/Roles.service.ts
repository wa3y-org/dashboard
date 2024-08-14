import { rolesRepository } from "../index";
import type { Permission } from "../../domain/models/Permissions";
import type { Role } from "../../domain/models/Roles";
import type { BackendError } from "../BackendError";
import type {
  CreateRoleResponse,
  FetchRolesListResponse,
  FetchOneRoleResponse,
  SaveRoleResponse,
} from "../../domain/ports/RolesRepository";

const repository = rolesRepository;

/**
 * Send create role request to backend
 * @param title title of the role
 * @param description description of the role
 * @param permissions permissions granted to the role
 */
async function createRole(
  title: string,
  description: string = "",
  permissions: Set<Permission> = new Set()
): Promise<CreateRoleResponse> {
  return await repository.create(title, description, permissions);
}

/**
 * fetch all roles from backend
 * @returns List of roles and possible backend error
 */
async function getAllRoles(): Promise<FetchRolesListResponse> {
  return await repository.fetchAll();
}

async function fetchOne(id: string): Promise<FetchOneRoleResponse> {
  return await repository.fetchOne(id);
}

async function update(id: string, role: Role): Promise<SaveRoleResponse> {
  return await repository.update(id, role);
}

export const RolesService = {
  createRole,
  getAllRoles,
  fetchOne,
  update,
};

export default RolesService;
