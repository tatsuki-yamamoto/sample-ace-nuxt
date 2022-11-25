<script lang="ts" setup>
import { mdiDotsVertical, mdiAccount, mdiCog, mdiLogout } from '@mdi/js';
const { authUserState } = useAuth();

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

const { signOut, deleteAuthInfo } = useAuth();
const loading = ref(false);
const logout = async () => {
  loading.value = true;
  const { error } = await signOut();
  if (!error.value) {
    deleteAuthInfo();
    navigateTo('/login');
  }
  loading.value = false;
};
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
          <v-btn v-bind="props" icon>
            <v-icon :icon="mdiDotsVertical"></v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item density="comfortable" lines="three">
              <v-list-item-title class="text-xl">
                {{ authUserState.lastName }} {{ authUserState.firstName }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ authUserState.email }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list nav>
            <v-list-item to="/account/edit" title="アカウント編集" :prepend-icon="mdiAccount"></v-list-item>
            <v-list-item to="/account/setting" title="設定" :prepend-icon="mdiCog"></v-list-item>
            <v-list-item
              title="ログアウト"
              :prepend-icon="mdiLogout"
              :loading="loading"
              @click="logout()"
            ></v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
