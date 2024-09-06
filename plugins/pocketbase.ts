export default defineNuxtPlugin((app) => {
  app.vueApp.config.globalProperties.$pb = usePocketBase();
});
