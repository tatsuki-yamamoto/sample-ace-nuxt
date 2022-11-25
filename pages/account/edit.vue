<script setup>
useHead({ title: 'アカウント編集' });
definePageMeta({ layout: 'auth', middleware: ['auth'] });
</script>

<template>
  <templates-account-edit-main></templates-account-edit-main>
</template>
