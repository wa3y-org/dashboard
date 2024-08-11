import type { BackendError } from "../../services/BackendError";
import type { Permission } from "../models/Permissions";
import type { Role } from "../models/Roles";

export interface IRolesRepository {
  /**
   * creates new role and store it the backend
   * @param title the title of the role
   * @param description short description of the role
   * @param permissions set of permissions granted to that role
   */
  create(
    title: string,
    description: string,
    permissions: Set<Permission>
  ): Promise<{ role: Role | null; error: BackendError | null }>;
}
