<script lang="ts" setup>
import { Post, defaultPost } from '~~/types/post';

// useFetch
const { data: post } = await useFetch<Post>('https://jsonplaceholder.typicode.com/posts/1', { default: defaultPost });
</script>

<template>
  <molecules-sub-title-and-contents title="useFetch">
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <molecules-card-post :post="post"></molecules-card-post>
      </v-col>
    </v-row>
  </molecules-sub-title-and-contents>
</template>
