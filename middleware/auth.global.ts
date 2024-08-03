// routes that requires the user must be logged out
const loggedOutRoutes = [
  '/auth/login',
];

// function to check if the given path requires that the user must be *logged out*
function isLoggedOutRoute(path: string): boolean {
  return loggedOutRoutes.includes(path);
}

export default defineNuxtRouteMiddleware((to, from) => {
  const path = to.path.trim().toLocaleLowerCase();

  console.log(isLoggedOutRoute(path))
});
