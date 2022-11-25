<script setup>
useHead({ title: 'List' });
definePageMeta({ layout: 'auth', middleware: ['auth'] });
</script>

<template>
  <templates-sample-list-main />
</template>
