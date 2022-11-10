import { defineNuxtPlugin } from '#app';

// Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { defaults } from '~~/helpers/vuetify/defaults';
import { mainTheme, MAIN_THEME } from '~~/helpers/vuetify/themes';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    defaults,
    theme: {
      defaultTheme: MAIN_THEME,
      themes: {
        mainTheme,
      },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
