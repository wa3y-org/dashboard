import { AuthService } from "~/app/modules/users/services";
import type { TEmployee } from "./employees/index";

const employee: Ref<TEmployee | null> = ref(null);
const { loading, loadOneEmployee } = useEmployees();

const id = computed(() => {
  return (
    AuthService.AuthenticatedUser?.id || usePocketBase().authStore.model?.id
  );
});

async function loadUser() {
  employee.value = await loadOneEmployee(id.value);
}

const roles = computed(() => {
  if (employee.value?.expand && employee.value?.expand.roles) {
    return employee.value?.expand?.roles;
  }
  return [];
});

const allPermissions = computed<Set<string>>(() => {
  const permissions = new Set<string>();
  for (let role of roles.value) {
    for (let permission of role.permissions) {
      permissions.add(permission);
    }
  }

  return permissions;
});

export function useCurrentUser() {
  return {
    employee,
    loadUser,
    allPermissions,
    roles,
    async init() {
      await loadUser();
      return employee.value;
    }
  };
}
