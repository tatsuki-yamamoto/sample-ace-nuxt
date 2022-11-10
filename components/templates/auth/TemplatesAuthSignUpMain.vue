<script lang="ts" setup>
import { mdiEye, mdiEyeOff } from '@mdi/js';
const { ruleEmail, rulePassLen, ruleRequired } = useFormRules();

const showPassword = ref(false);
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const signUpForm = reactive({
  email: '',
  lastName: '',
  firstName: '',
  password: '',
});
const loading = ref(false);
// const { signUp } = useAuth()
const formValid = ref(false);
const createAccount = async () => {
  if (!formValid.value) return;
  loading.value = true;
  // await signUp(signUpForm)
  //   .then(async () => {
  //     return await navigateTo('/')
  //   })
  //   .catch(() => {
  //     alert('アカウント新規登録が失敗しました。')
  //   })
  loading.value = false;
};
</script>

<template>
  <atoms-layout-container>
    <molecules-button-back text="ログイン画面へ戻る"></molecules-button-back>
    <v-card max-width="500" flat class="mx-auto pa-6 mt-12">
      <v-form v-model="formValid" @submit.prevent="createAccount()">
        <v-text-field
          v-model="signUpForm.email"
          type="email"
          name="email"
          :rules="[ruleRequired, ruleEmail]"
          label="メールアドレス"
          persistent-placeholder
          placeholder="abc@example.com"
        />
        <v-text-field
          v-model="signUpForm.lastName"
          name="lastName"
          :rules="[ruleRequired]"
          label="姓"
          persistent-placeholder
          placeholder="山田"
          class="mt-4"
        />
        <v-text-field
          v-model="signUpForm.firstName"
          name="firstName"
          :rules="[ruleRequired]"
          label="名"
          persistent-placeholder
          placeholder="太郎"
          class="mt-4"
        />
        <v-text-field
          v-model="signUpForm.password"
          :type="showPassword ? 'password' : 'text'"
          name="password"
          :rules="[ruleRequired, rulePassLen]"
          label="パスワード"
          :append-inner-icon="showPassword ? mdiEye : mdiEyeOff"
          persistent-placeholder
          class="mt-4"
          @click:appendInner="toggleShowPassword()"
        />
        <v-btn type="submit" block color="primary" flat size="x-large" :loading="loading" class="mt-4"
          >アカウント新規登録</v-btn
        >
      </v-form>
    </v-card>
  </atoms-layout-container>
</template>
