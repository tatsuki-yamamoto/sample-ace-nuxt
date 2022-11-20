<script lang="ts" setup>
const drawer = ref(false);
const items = [
  {
    title: 'Top',
    to: '/',
  },
  {
    title: 'Basic',
    to: '/sample/basic',
  },
  {
    title: 'List',
    to: '/sample/list',
  },
  {
    title: 'Fetch Data',
    to: '/sample/fetch-data',
  },
];
</script>

<template>
  <div>
    <v-app-bar color="primary" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <span class="cursor-pointer" @click="$router.push('/')">サンプル</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn flat v-bind="props">山田 太郎</v-btn>
        </template>
        <v-list>
          <v-list-item to="/user/setting" title="設定"></v-list-item>
          <v-list-item to="/login" title="ログアウト"></v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
