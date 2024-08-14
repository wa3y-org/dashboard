import { RolesService } from "@/app/modules/users/services/roles/Roles.service";
import { Role } from "@/app/modules/users/domain/models/Roles";

export function useLoadRole() {
  const route = useRoute();

  const loading = useLoading();

  const roleId = route.params["role_id"].toString();

  const role: Ref<Role | null> = ref(null);
  const backendError = useBackendError();

  async function load() {
    loading.start();
    const response = await RolesService.fetchOne(roleId);
    loading.end();
    if (response.error) {
      backendError.set(response.error);
      return;
    }

    role.value = response.role;
  }

  

  return {
    loading,
    role,
    backendError,
    load,
  };
}
