import Swal from "sweetalert2";

type RemoveAlertOptions = {
  title?: string;
  subtitle?: string;
};

export function useConfirmRemove() {
  async function confirm(options: RemoveAlertOptions = {}) {
    options.title = options.title || "Confirm Remove";
    options.subtitle = options.subtitle || "You can't undo this operation";

    return await Swal.fire({
      title: `<p class='font-weight-black text-error'>${options.title}</p>`,
      html: `
        <p class='text-warning my-2'>${options.subtitle}</p>
        <hr class='mt-6' />
      `,
      icon: "warning",
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonColor: "#d333",
      confirmButtonText: "<p class='font-weight-black'> Remove </p>",
      denyButtonText: "cancel",
      denyButtonColor: "#aaa",
      showDenyButton: true,
      backdrop: "rgba(123,0,0,0.6)",
    });
  }

  async function doRemove(
    removeFn: Function,
    options: RemoveAlertOptions = {}
  ) {
    options.title = options.title || "Removing Item";
    options.subtitle = options.subtitle || "Wait till remove is successful";

    await Swal.fire({
      title: `<p class='font-weight-black text-error'>${options.title}</p>`,
      html: `
        <p class='text-warning my-2'>${options.subtitle}</p>
        
      `,
      timerProgressBar: true,
      didOpen: async () => {
        Swal.showLoading();
        await removeFn();
        Swal.close();
        Swal.fire({
          title: "Removed!",
          text: "Your item has been removed.",
          icon: "success",
        });
      },
    });
  }
  return {
    confirm,
    doRemove,
  };
}
