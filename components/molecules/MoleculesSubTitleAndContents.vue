<script lang="ts" setup>
type Props = {
  title: string;
};
defineProps<Props>();
</script>

<template>
  <div class="mt-3 mb-9">
    <atoms-text-sub-title>{{ title }}</atoms-text-sub-title>
    <slot />
  </div>
</template>
