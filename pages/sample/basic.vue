<script setup>
useHead({ title: 'Basic' });
definePageMeta({ layout: 'auth', middleware: ['auth'] });
</script>

<template>
  <templates-sample-basic-main />
</template>
