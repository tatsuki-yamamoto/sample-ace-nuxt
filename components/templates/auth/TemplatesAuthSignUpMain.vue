<script lang="ts" setup>
import { mdiEye, mdiEyeOff } from '@mdi/js';
const { ruleEmail, rulePassLen, ruleRequired, rulePassConfirm } = useFormRules();

const showPassword = ref(false);
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const showPasswordConfirmation = ref(false);
const toggleShowPasswordConfirmation = () => {
  showPasswordConfirmation.value = !showPassword.value;
};

const signUpForm = reactive({
  email: '',
  lastName: '',
  firstName: '',
  password: '',
  passwordConfirmation: '',
});

const agreed = ref(false);

const loading = ref(false);
const { signUp } = useAuth();
const formValid = ref(false);
const createAccount = async () => {
  if (!formValid.value) return;
  loading.value = true;
  const { error } = await signUp({ ...signUpForm });
  if (!error.value) {
    alert('アカウントを新規登録しました。');
    navigateTo('/');
  }
  loading.value = false;
};
</script>

<template>
  <atoms-layout-container>
    <molecules-button-back text="ログイン画面へ戻る"></molecules-button-back>
    <v-card max-width="500" flat class="mx-auto pa-6 mt-6">
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
          autocomplete="off"
          class="mt-4"
          @click:append-inner="toggleShowPassword()"
        />
        <v-text-field
          v-model="signUpForm.passwordConfirmation"
          :type="showPassword ? 'password' : 'text'"
          name="passwordConfirmation"
          :rules="[ruleRequired, rulePassLen, (v) => rulePassConfirm(v, signUpForm.password)]"
          label="パスワード(確認用)"
          :append-inner-icon="showPassword ? mdiEye : mdiEyeOff"
          persistent-placeholder
          autocomplete="off"
          class="mt-4"
          @click:append-inner="toggleShowPasswordConfirmation()"
        />
        <v-checkbox
          v-model="agreed"
          :rules="[(v) => !!v || '同意する必要があります']"
          label="「利用規約」に同意する"
        ></v-checkbox>
        <v-btn type="submit" block color="primary" flat size="x-large" :loading="loading" class="mt-6">
          アカウント新規登録
        </v-btn>
      </v-form>
    </v-card>
  </atoms-layout-container>
</template>
