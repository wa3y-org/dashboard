import { AuthService } from "~/app/modules/users/services";

export function useLogout() {
  return {
    logout: async () => {
      await AuthService.logout();
      useRouter().replace("/auth");
    },
  };
}
