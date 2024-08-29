// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VDateInput } from "vuetify/labs/VDateInput";
import { VNumberInput } from "vuetify/labs/VNumberInput";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      VDateInput,
      VNumberInput,
    },
    // ... your configuration
    ssr: true,
    theme: {
      themes: {
        light: {
          colors: {
            primary: "#4A148C",
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
