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
    alert('基本情報を更新しました。\nメールアドレスを変更した場合は確認メールが送信されます。');
  }
  loading.value = false;
};
</script>

<template>
  <molecules-sub-title-and-contents title="基本情報">
    <v-card max-width="500" flat class="mx-auto pa-6">
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
        <v-btn type="submit" block color="primary" flat size="x-large" :loading="loading" class="mt-6">
          基本情報を更新する
        </v-btn>
      </v-form>
    </v-card>
  </molecules-sub-title-and-contents>
</template>
