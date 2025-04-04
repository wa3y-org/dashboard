import { AuthService } from "~/app/modules/users/services";

// routes that are accessible to unauthenticated users (public routes)
const publicRoutes = [
  "/auth/login",
  "/auth/confirm-password-reset/[token]",
  "/auth/forgot-password",
  "/auth/register"
];

// function to check if the given path is a public route
function isPublicRoute(path: string): boolean {
  for (const route of publicRoutes) {
    // Handle dynamic route segments like [token]
    if (route.includes("[")) {
      const routeRegex = new RegExp(
        "^" + route.replace(/\[[^\]]+\]/g, "[^/]+") + "$"
      );
      if (routeRegex.test(path)) {
        return true;
      }
    } else if (path.startsWith(route)) {
      return true;
    }
  }
  return false;
}

export default defineNuxtRouteMiddleware((to, from) => {
  const path = to.path.trim().toLocaleLowerCase();
  const isAuthenticated = AuthService.isAuthenticated;

  // If the user is not authenticated AND is trying to access a protected route (not a public route), redirect to login
  if (!isAuthenticated && !isPublicRoute(path)) {
    return navigateTo("/auth/login");
  }

  // If the user is authenticated and trying to access a public route, redirect to home
  if (isAuthenticated && isPublicRoute(path)) {
    return navigateTo("/");
  }

  // Otherwise, allow the navigation to proceed (either the user is authenticated and accessing a protected route, or the user is not authenticated and accessing a public route)
});
