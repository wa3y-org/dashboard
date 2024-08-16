import type { Role } from "~/app/modules/users/domain/models/Roles";
import type { User } from "~/app/modules/users/domain/models/User";
import type { OneModelResponse } from "~/app/modules/users/domain/ports/CRUDRepository";
import type { BackendError } from "~/app/modules/users/services/BackendError";
import UsersService from "~/app/modules/users/services/users/users.service";

export type SaveUserFn = () => Promise<OneModelResponse<User>>;

export function useSaveUser() {
  const updateUser: SaveUserFn = () => {
    throw new Error("implement this function");
  };
  const createNewUser: SaveUserFn = async () => {
    const response = await UsersService.createNewUser({
      avatar: avatarImage.value || undefined,
      name: name.value,
      email: email.value,
      bio: bio.value,
      roles: selectedRoles.value,
    });
    if (response.model && !response.error) {
      emptyInput();
    }
    return response;
  };

  const isSaved: Ref<boolean> = ref(false);
  function showSaveSuccess() {
    isSaved.value = true;
  }

  function hideSaveSuccess() {
    isSaved.value = false;
  }
  const savedUser: Ref<User | null> = ref(null);

  const backendError: Ref<BackendError | null> = ref(null);

  const avatarImage: Ref<File | null> = ref(null);
  const avatarErrors: Ref<string[]> = ref([]);

  const name = ref("");
  const nameErrors: Ref<string[]> = ref([]);

  const email = ref("");
  const emailErrors: Ref<string[]> = ref([]);

  const bio = ref("");
  const bioErrors: Ref<string[]> = ref([]);

  const selectedRoles: Ref<Set<Role>> = ref(new Set());
  const selectedRolesErrors: Ref<string[]> = ref([]);

  const hasInputError = computed(() => {
    if (
      nameErrors.value.length ||
      emailErrors.value.length ||
      avatarErrors.value.length ||
      bioErrors.value.length ||
      selectedRolesErrors.value.length
    ) {
      return true;
    }
    return false;
  });
  function clearInputErrors() {
    avatarErrors.value = [];
    nameErrors.value = [];
    emailErrors.value = [];
    bioErrors.value = [];
    selectedRolesErrors.value = [];
    backendError.value = null;
  }
  function validateInput() {
    clearInputErrors();
    hideSaveSuccess();
    //validate image
    //validate name
    if (!name.value || name.value.trim() == "") {
      nameErrors.value.push("Enter the name of the new user");
    }
    //validate email
    if (
      !email.value ||
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.value)
    ) {
      emailErrors.value.push("Enter valid email: address");
    }
    //validate bio
    //validate selected roles
    if (selectedRoles.value.size < 1) {
      selectedRolesErrors.value.push("Please Select one role ata least");
    }
  }

  function emptyInput() {
    clearInputErrors();
    avatarImage.value = null;
    name.value = "";
    email.value = "";
    bio.value = "";
    selectedRoles.value = new Set();
  }
  const loading = useLoading();
  async function save(action: "create" | "update") {
    // validate data
    validateInput();

    if (hasInputError.value) return;

    let saveFn: SaveUserFn;
    switch (action) {
      case "create":
        saveFn = createNewUser;
        break;
      case "update":
        saveFn = updateUser;
        break;
      default:
        saveFn = createNewUser;
        break;
    }

    loading.start();
    const response = await saveFn();
    loading.end();

    if (response.error) {
      backendError.value = response.error;
      return;
    }

    savedUser.value = response.model;

    showSaveSuccess();
  }

  const data = {
    avatarImage,
    name,
    email,
    bio,
    selectedRoles,
    savedUser,
  };

  const errors = {
    avatarErrors,
    nameErrors,
    emailErrors,
    bioErrors,
    selectedRolesErrors,
    backendError,
  };

  const status = {
    isSaved,
    loading,
    hasInputError,
  };

  return {
    data,
    errors,
    status,
    save,
    validateInput,
  };
}
