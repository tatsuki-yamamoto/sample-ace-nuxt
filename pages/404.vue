<script setup lang="ts">
useHead({ title: 'お探しのページが見つかりませんでした' });

const error = useError();
const toTopPage = () => {
  const router = useRouter();
  router.go(-1);
};
</script>

<template>
  <atoms-layout-container class="text-center">
    <h1 class="text-3xl font-bold mt-12">お探しのページが見つかりませんでした</h1>
    <p class="mt-6 mb-9">
      あなたがアクセスしたページは、削除されたかURLが変更されているため<br />表示することができませんでした。
    </p>
    <button class="btn" @click="toTopPage()">前のページへ戻る</button>
  </atoms-layout-container>
</template>
