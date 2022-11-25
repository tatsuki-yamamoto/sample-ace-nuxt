<script setup>
useHead({ title: 'トップ' });
definePageMeta({ layout: 'auth', middleware: ['auth'] });
</script>

<template>
  <templates-top-main />
</template>
