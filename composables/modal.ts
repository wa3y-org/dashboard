export function useModal() {
  const isShown: Ref<boolean> = ref(false);
  function show() {
    isShown.value = true;
  }

  function hide() {
    isShown.value = false;
  }

  return {
    isShown,
    show,
    hide,
  };
}
