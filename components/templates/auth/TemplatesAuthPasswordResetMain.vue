<script lang="ts" setup>
import { mdiEye, mdiEyeOff } from '@mdi/js';
const { rulePassLen, ruleRequired, rulePassConfirm } = useFormRules();

const showPassword = ref(false);
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const showPasswordConfirmation = ref(false);
const toggleShowPasswordConfirmation = () => {
  showPasswordConfirmation.value = !showPassword.value;
};

const resetPasswordForm = reactive({
  password: '',
  passwordConfirmation: '',
  resetPasswordToken: '',
});
const loading = ref(false);
const formValid = ref(false);
const { putAuthPassword } = useAuth();
const route = useRoute();

// クエリーパラメーターからトークンを設定
resetPasswordForm.resetPasswordToken = String(route.query.reset_password_token);

const resetPassword = async () => {
  if (!formValid.value) return;
  loading.value = true;
  const { error } = await putAuthPassword({ ...resetPasswordForm });
  if (!error.value) {
    alert('パスワードを再設定しました。');
    await navigateTo('/');
  }
  loading.value = false;
};
</script>

<template>
  <atoms-layout-container>
    <v-card max-width="500" flat class="mx-auto pa-6 mt-6">
      <v-form v-model="formValid" @submit.prevent="resetPassword()">
        <v-text-field
          v-model="resetPasswordForm.password"
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
          v-model="resetPasswordForm.passwordConfirmation"
          :type="showPassword ? 'password' : 'text'"
          name="passwordConfirmation"
          :rules="[ruleRequired, rulePassLen, (v) => rulePassConfirm(v, resetPasswordForm.password)]"
          label="パスワード(確認用)"
          :append-inner-icon="showPassword ? mdiEye : mdiEyeOff"
          persistent-placeholder
          autocomplete="off"
          class="mt-4"
          @click:append-inner="toggleShowPasswordConfirmation()"
        />
        <v-btn type="submit" block color="primary" flat size="x-large" :loading="loading" class="mt-6">
          パスワードを再設定する
        </v-btn>
      </v-form>
    </v-card>
  </atoms-layout-container>
</template>
