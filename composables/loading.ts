export function useLoading() {
  const isLoading: Ref<boolean> = ref(false);
  function start() {
    isLoading.value = true;
  }

  function end() {
    isLoading.value = false;
  }

  return {
    isLoading,
    start,
    end,
  };
}
