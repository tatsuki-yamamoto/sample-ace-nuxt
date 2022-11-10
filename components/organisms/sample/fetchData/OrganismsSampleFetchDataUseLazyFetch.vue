<script lang="ts" setup>
import { Post } from '~~/types/post';

// useLazyFetch
const { pending, refresh, data: posts } = useLazyFetch<Post[]>('https://jsonplaceholder.typicode.com/posts');
const postsLimited = computed(() => {
  return posts.value?.filter((post, index) => index < 3);
});
watch(posts, () => {
  console.log('再取得');
});
</script>

<template>
  <molecules-sub-title-and-contents title="useLazyFetch">
    <v-btn color="primary" :loading="pending" class="mb-3" @click="refresh()">再取得</v-btn>
    <v-row>
      <v-col v-for="post in postsLimited" :key="post.id" cols="12" md="6" lg="4">
        <molecules-card-post :post="post"></molecules-card-post>
      </v-col>
    </v-row>
  </molecules-sub-title-and-contents>
</template>
