import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false, // SPAモード
  runtimeConfig: {},
  build: {
    transpile: ["vuetify"],
  },
  css: ["vuetify/lib/styles/main.sass"],
  buildModules: ["@nuxtjs/tailwindcss"],
  vite: {
    define: {
      "process.env.DEBUG": "false",
    },
  },
  typescript: {
    strict: true
  },
})
