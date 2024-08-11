import { BackendError } from "@/app/modules/users/services/BackendError";

export function useBackendError() {
  const backendError: Ref<BackendError | null> = ref(null);
  function set(e: BackendError) {
    backendError.value = e;
  }
  function clear() {
    backendError.value = null;
  }

  const hasError = computed(() => {
    return backendError.value != null;
  });

  return reactive({
    set,
    clear,
    hasError,
    error: backendError,
  });
}
