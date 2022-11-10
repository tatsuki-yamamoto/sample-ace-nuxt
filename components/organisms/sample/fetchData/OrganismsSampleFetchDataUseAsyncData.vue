<script lang="ts" setup>
import { Post } from '~~/types/post';

// useAsyncData
// ※useFetchとほぼいっしょ
const { data: post } = await useAsyncData<Post>('post', () => {
  return $fetch('https://jsonplaceholder.typicode.com/posts/1');
});
</script>

<template>
  <molecules-sub-title-and-contents title="useAsyncData">
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <molecules-card-post :post="post"></molecules-card-post>
      </v-col>
    </v-row>
  </molecules-sub-title-and-contents>
</template>
