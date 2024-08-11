import { rolesRepository } from "../index";
import type { Permission } from "../../domain/models/Permissions";
import type { Role } from "../../domain/models/Roles";
import type { BackendError } from "../BackendError";

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
): Promise<{ role: Role | null; error: BackendError | null }> {
  return await repository.create(title, description, permissions);
}

export const RolesService = {
  createRole,
};

export default RolesService;
