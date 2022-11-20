<script lang="ts" setup>
import { mdiEye, mdiEyeOff, mdiLock, mdiEmail } from '@mdi/js';
const { ruleEmail, rulePassLen, ruleRequired } = useFormRules();

const showPassword = ref(false);
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const loginForm = reactive({
  email: '',
  password: '',
});
// const { signIn } = useAuth()
const loading = ref(false);
const formValid = ref(false);
const login = () => {
  if (!formValid.value) return;
  loading.value = true;
  // await signIn(email.value, password.value)
  //   .then(async () => {
  //     return await navigateTo('/');
  //   })
  //   .catch(() => {
  //     alert('ログイン認証に失敗しました。');
  //   });
  setTimeout(() => {
    navigateTo('/');
    loading.value = false;
  }, 2000);
};
</script>
<template>
  <atoms-layout-container>
    <v-card max-width="500" flat class="mx-auto pa-6 mt-12">
      <v-form v-model="formValid" @submit.prevent="login()">
        <v-text-field
          v-model="loginForm.email"
          type="email"
          :rules="[ruleRequired, ruleEmail]"
          name="email"
          :prepend-icon="mdiEmail"
          label="メールアドレス"
          persistent-placeholder
        />
        <v-text-field
          v-model="loginForm.password"
          :type="showPassword ? 'password' : 'text'"
          name="password"
          :rules="[ruleRequired, rulePassLen]"
          :prepend-icon="mdiLock"
          label="パスワード"
          persistent-placeholder
          :append-inner-icon="showPassword ? mdiEye : mdiEyeOff"
          class="mt-4"
          @click:append-inner="toggleShowPassword()"
        />
        <v-btn type="submit" block color="primary" flat size="x-large" :loading="loading" class="mt-4">
          ログイン
        </v-btn>
      </v-form>
      <v-btn block color="primary" variant="plain" to="/auth/sign-up" class="mt-4">新規登録</v-btn>
      <v-btn block color="primary" variant="plain" to="/auth/new-password" class="mt-2">パスワードを忘れた場合</v-btn>
    </v-card>
  </atoms-layout-container>
</template>
