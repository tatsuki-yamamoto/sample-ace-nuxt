<script lang="ts" setup>
import { Post } from '~~/types/post';

// useLazyAsyncData
// ※useLazyFetchとほぼいっしょ
const {
  pending,
  refresh,
  data: posts,
} = useLazyAsyncData<Post[]>('posts', () => {
  return $fetch('https://jsonplaceholder.typicode.com/posts');
});
const postsLimited = computed(() => posts.value?.filter((post, index) => index < 3));
</script>

<template>
  <molecules-sub-title-and-contents title="useLazyAsyncData">
    <v-btn color="primary" class="mb-3" :loading="pending" @click="refresh()">再取得</v-btn>
    <v-row>
      <v-col v-for="post in postsLimited" :key="post.id" cols="12" md="6" lg="4">
        <molecules-card-post :post="post"></molecules-card-post>
      </v-col>
    </v-row>
  </molecules-sub-title-and-contents>
</template>
