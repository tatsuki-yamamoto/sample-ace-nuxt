<script lang="ts" setup>
import { VForm } from 'vuetify/components';
const { ruleRequired, ruleEmail } = useFormRules();

const { authUserState } = useAuth();
type AuthUserForm = {
  email: string;
  lastName: string;
  firstName: string;
};
const authUserForm = reactive<AuthUserForm>({ ...authUserState.value });

const loading = ref(false);
const formValid = ref(false);
const form = ref<VForm>();
const { putAuth } = useAuth();
const updateAuthUser = async () => {
  await form.value?.validate();
  if (!formValid.value) return;
  loading.value = true;
  const { data, error } = await putAuth({ ...authUserForm });
  if (!error.value && data.value?.data) {
    authUserState.value = data.value?.data;
    alert('更新しました。');
  }
  loading.value = false;
};
</script>

<template>
  <atoms-layout-container>
    <molecules-button-back></molecules-button-back>
    <atoms-text-title>アカウント編集</atoms-text-title>
    <v-card max-width="500" flat class="mx-auto pa-6 mt-6">
      <v-form ref="form" v-model="formValid" @submit.prevent="updateAuthUser()">
        <v-text-field
          v-model="authUserForm.email"
          type="email"
          name="email"
          :rules="[ruleRequired, ruleEmail]"
          label="メールアドレス"
          persistent-placeholder
          placeholder="abc@example.com"
        />
        <v-text-field
          v-model="authUserForm.lastName"
          name="lastName"
          :rules="[ruleRequired]"
          label="姓"
          persistent-placeholder
          placeholder="山田"
          class="mt-4"
        />
        <v-text-field
          v-model="authUserForm.firstName"
          name="firstName"
          :rules="[ruleRequired]"
          label="名"
          persistent-placeholder
          placeholder="太郎"
          class="mt-4"
        />
        <v-btn type="submit" block color="primary" flat size="x-large" :loading="loading" class="mt-6">更新する</v-btn>
      </v-form>
    </v-card>
  </atoms-layout-container>
</template>
