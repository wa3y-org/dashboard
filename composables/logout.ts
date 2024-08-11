import { AuthService } from "~/app/modules/users/services";

async function logout() {
  await AuthService.logout();
  useRouter().replace("/auth");
}


export function useLogout() {
  return {
    logout,
  };
}
