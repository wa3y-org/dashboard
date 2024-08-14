import type { BackendError } from "../../services/BackendError";
import type { Permission } from "../models/Permissions";
import type { Role } from "../models/Roles";

export type CreateRoleResponse = {
  role: Role | null;
  error: BackendError | null;
};

export type SaveRoleResponse = {
  role: Role | null;
  error: BackendError | null;
};

export type FetchRolesListResponse = {
  roles: Role[] | null;
  error: BackendError | null;
};
export type FetchOneRoleResponse = {
  role: Role | null;
  error: BackendError | null;
};

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

  /**
   * Fetch all roles from backend
   */
  fetchAll(): Promise<FetchRolesListResponse>;

  /**
   * Fetch one role from backend
   * @param id : id of the role
   */
  fetchOne(id: string): Promise<FetchOneRoleResponse>;

  /**
   * update the role at the backend
   * @param id : id of the role we want to update
   * @param role : the new value of the role
   */
  update(id: string, role: Role): Promise<SaveRoleResponse>;
}
