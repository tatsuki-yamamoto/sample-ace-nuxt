<script lang="ts" setup>
import { mdiMagnify } from '@mdi/js';
type Search = {
  title: string;
  content: string;
};

const props = withDefaults(
  defineProps<{
    search: Search;
  }>(),
  {},
);
</script>

<template>
  <molecules-dialog btnText="検索する" :btnIcon="mdiMagnify" title="検索条件">
    <v-text-field v-model="search.title" label="タイトル"></v-text-field>
    <v-text-field v-model="search.content" label="内容" class="mt-4"></v-text-field>
  </molecules-dialog>
</template>
