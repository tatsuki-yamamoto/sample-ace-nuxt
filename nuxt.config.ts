import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // SPAモード
  build: {
    transpile: ['vuetify'],
  },
  css: ['vuetify/lib/styles/main.sass'],
  modules: ['@nuxtjs/tailwindcss'],
  vite: {
    define: {
      'process.env.DEBUG': 'false',
    },
  },
  typescript: {
    strict: true,
  },
});
