import { AuthService } from "~/app/modules/users/services/auth/Auth.service";

// routes that requires the user must be logged out
const loggedOutRoutes = ["/auth/login"];

// function to check if the given path requires that the user must be *logged out*
function isLoggedOutRoute(path: string): boolean {
  return loggedOutRoutes.includes(path);
}

export default defineNuxtRouteMiddleware((to, from) => {
  const path = to.path.trim().toLocaleLowerCase();
  const isAuthenticated = AuthService.instance.isAuthenticated;
  if (isAuthenticated && isLoggedOutRoute(path)) {
    return navigateTo("/");
  }

  if (!isAuthenticated && !isLoggedOutRoute(path)) {
    return navigateTo("/auth/login");
  }
});
