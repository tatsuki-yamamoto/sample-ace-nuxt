<script setup>
useHead({
  title: 'Nuxt3 sample',
  titleTemplate: `%s | Nuxt3 sample`,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [{ name: 'description', content: 'Nuxt3 sample' }],
});
</script>

<template>
  <v-app>
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </v-app>
</template>
