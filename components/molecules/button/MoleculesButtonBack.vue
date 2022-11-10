<script lang="ts" setup>
import { mdiChevronLeft } from '@mdi/js';
const props = withDefaults(
  defineProps<{
    text?: string;
  }>(),
  {
    text: '前の画面へ戻る',
  },
);
</script>

<template>
  <v-btn flat @click="$router.go(-1)">
    <v-icon start :icon="mdiChevronLeft"></v-icon>
    {{ text }}
  </v-btn>
</template>
