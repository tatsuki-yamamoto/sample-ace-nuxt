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
const { signIn } = useAuth();
const loading = ref(false);
const formValid = ref(false);
const login = async () => {
  console.log(formValid.value);
  if (!formValid.value) return;
  loading.value = true;
  const { error } = await signIn({ ...loginForm });
  if (!error.value) {
    await navigateTo('/');
  }
  loading.value = false;
};
</script>
<template>
  <atoms-layout-container>
    <v-card max-width="500" flat class="mx-auto pa-6 mt-12">
      <v-form v-model="formValid" @submit.prevent="login()">
        <v-text-field
          v-model="loginForm.email"
          type="email"
          :rules="[ruleRequired]"
          name="email"
          :prepend-icon="mdiEmail"
          label="メールアドレス"
          persistent-placeholder
        />
        <v-text-field
          v-model="loginForm.password"
          :type="showPassword ? 'password' : 'text'"
          name="password"
          :rules="[ruleRequired]"
          :prepend-icon="mdiLock"
          label="パスワード"
          persistent-placeholder
          :append-inner-icon="showPassword ? mdiEye : mdiEyeOff"
          autocomplete="off"
          class="mt-4"
          @click:append-inner="toggleShowPassword()"
        />
        <v-btn type="submit" block color="primary" flat size="x-large" :loading="loading" class="mt-4">
          ログイン
        </v-btn>
      </v-form>
      <v-btn block color="primary" variant="plain" to="/auth/sign-up" class="mt-4">新規登録</v-btn>
      <v-btn block color="primary" variant="plain" to="/auth/password-reissue" class="mt-2">
        パスワードを忘れた場合
      </v-btn>
    </v-card>
  </atoms-layout-container>
</template>
