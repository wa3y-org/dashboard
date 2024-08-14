import { RolesService } from "@/app/modules/users/services/roles/Roles.service";
import { Role } from "@/app/modules/users/domain/models/Roles";
import type { Permission } from "@/app/modules/users/domain/models/Permissions";
import { BackendError } from "@/app/modules/users/services/BackendError";
import type { SaveRoleResponse } from "~/app/modules/users/domain/ports/RolesRepository";

export function useSaveRole() {
  const title = ref("");
  const titleErrors: Ref<string[]> = ref([]);

  const description = ref("");
  const descriptionErrors: Ref<string[]> = ref([]);

  const selectedPermissions: Ref<Set<Permission>> = ref(new Set());
  const permissionsErrors: Ref<string[]> = ref([]);

  function emptyInput() {
    title.value = "";
    description.value = "";
    selectedPermissions.value.clear();
    resetErrors();
  }
  /**
   * Set errors to none (empty array)
   */
  function resetErrors() {
    backendError.value = null;
    titleErrors.value = [];
    descriptionErrors.value = [];
    permissionsErrors.value = [];
  }

  const hasInputError: ComputedRef<boolean> = computed(() => {
    if (
      titleErrors.value.length > 0 ||
      descriptionErrors.value.length > 0 ||
      permissionsErrors.value.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  });

  /**
   * validate the input
   */
  function validateInput(): boolean {
    resetErrors();

    if (!title.value || title.value.trim() == "") {
      titleErrors.value.push("Enter Valid title");
    }

    if (selectedPermissions.value.size < 1) {
      permissionsErrors.value.push("Select at least one permission");
    }

    return !hasInputError.value;
  }

  const loading = useLoading();

  const savedRole: Ref<Role | null> = ref(null);

  const backendError: Ref<BackendError | null> = ref(null);

  const isSaved: Ref<boolean> = ref(false);
  function showSaveSuccess() {
    isSaved.value = true;
  }

  function hideSaveSuccess() {
    isSaved.value = false;
  }

  type SaveFn = (
    title: string,
    description: string,
    selectedPermissions: Set<Permission>
  ) => Promise<SaveRoleResponse>;

  /**
   * Send request to store the role in backends
   */
  async function saveRole(saveFun: SaveFn) {
    hideSaveSuccess();

    // validate data
    validateInput();

    if (hasInputError.value) return;

    loading.start();
    const { role, error } = await saveFun(
      title.value,
      description.value,
      selectedPermissions.value
    );
    loading.end();

    if (error) {
      backendError.value = error;
      return;
    }

    savedRole.value = role;

    showSaveSuccess();
  }

  return {
    data: {
      title,
      description,
      selectedPermissions,
    },
    errors: {
      titleErrors,
      descriptionErrors,
      permissionsErrors,
      backendError,
    },
    emptyInput,
    status: {
      hasInputError,
      loading,
      isSaved,
      showSaveSuccess,
      hideSaveSuccess,
    },
    savedRole,
    saveRole,
  };
}
