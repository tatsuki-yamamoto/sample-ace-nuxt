import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // SPAモード
  runtimeConfig: {
    public: {
      apiBaseURL: process.env.API_BASE_URL ?? 'http://localhost:8888',
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  css: ['vuetify/lib/styles/main.sass'],
  modules: ['@nuxtjs/tailwindcss'],
  typescript: {
    strict: true,
  },
});
