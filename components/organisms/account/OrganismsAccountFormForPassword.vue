<script lang="ts" setup>
import { VForm } from 'vuetify/components';
import { mdiEye, mdiEyeOff } from '@mdi/js';
const { ruleRequired, ruleEmail, rulePassLen, rulePassConfirm } = useFormRules();

const showCurrentPassword = ref(false);
const toggleShowCurrentPassword = () => {
  showCurrentPassword.value = !showCurrentPassword.value;
};

const showPassword = ref(false);
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const showPasswordConfirmation = ref(false);
const toggleShowPasswordConfirmation = () => {
  showPasswordConfirmation.value = !showPassword.value;
};

const authUserForm = reactive({
  currentPassword: '',
  password: '',
  passwordConfirmation: '',
});
const loading = ref(false);
const formValid = ref(false);
const form = ref<VForm>();
const { putAuthForPassword } = useAuth();
const updatePassword = async () => {
  await form.value?.validate();
  if (!formValid.value) return;
  loading.value = true;
  const { data, error } = await putAuthForPassword({ ...authUserForm });
  if (!error.value) {
    alert('パスワードを更新しました。');
  }
  loading.value = false;
};
</script>

<template>
  <molecules-sub-title-and-contents title="パスワード変更">
    <v-card max-width="500" flat class="mx-auto pa-6">
      <v-form ref="form" v-model="formValid" @submit.prevent="updatePassword()">
        <v-text-field
          v-model="authUserForm.currentPassword"
          :type="showCurrentPassword ? 'password' : 'text'"
          name="currentPassword"
          :rules="[ruleRequired]"
          label="現在のパスワード"
          :append-inner-icon="showCurrentPassword ? mdiEye : mdiEyeOff"
          persistent-placeholder
          autocomplete="off"
          class="mt-4"
          @click:append-inner="toggleShowCurrentPassword()"
        />
        <v-text-field
          v-model="authUserForm.password"
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
          v-model="authUserForm.passwordConfirmation"
          :type="showPasswordConfirmation ? 'password' : 'text'"
          name="passwordConfirmation"
          :rules="[ruleRequired, rulePassLen, (v) => rulePassConfirm(v, authUserForm.password)]"
          label="パスワード(確認用)"
          :append-inner-icon="showPasswordConfirmation ? mdiEye : mdiEyeOff"
          persistent-placeholder
          autocomplete="off"
          class="mt-4"
          @click:append-inner="toggleShowPasswordConfirmation()"
        />
        <v-btn type="submit" block color="primary" flat size="x-large" :loading="loading" class="mt-6">
          パスワードを更新する
        </v-btn>
      </v-form>
    </v-card>
  </molecules-sub-title-and-contents>
</template>
