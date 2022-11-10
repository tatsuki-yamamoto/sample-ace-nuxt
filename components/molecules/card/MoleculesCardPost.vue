<script lang="ts" setup>
import { defaultPost, Post } from '~~/types/post';

const props = withDefaults(
  defineProps<{
    post?: Post | null;
  }>(),
  {
    post: defaultPost,
  },
);
</script>

<template>
  <v-card>
    <v-card-title class="text-xl font-semibold">{{ post?.title }}</v-card-title>
    <v-card-text>{{ post?.body }}</v-card-text>
  </v-card>
</template>
