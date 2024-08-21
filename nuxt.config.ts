// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  css: ["vuetify/lib/styles/main.sass", "@/assets/styles/main.scss"],
  devtools: { enabled: true },
  //...
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    'nuxt-tiptap-editor',
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    //...
  ],
  tiptap: {
    prefix: 'Tiptap', //prefix for Tiptap imports, composables not included
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  ssr: false,
});
