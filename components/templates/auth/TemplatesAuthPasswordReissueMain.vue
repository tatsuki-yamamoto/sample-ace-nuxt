<script lang="ts" setup>
const { ruleRequired, ruleEmail } = useFormRules();

const reissuePasswordForm = reactive({
  email: '',
});
const loading = ref(false);
const { postAuthPassword } = useAuth();
const formValid = ref(false);
const reissuePassword = async () => {
  if (!formValid.value) return;
  loading.value = true;
  const { error } = await postAuthPassword({ ...reissuePasswordForm });
  if (!error.value) {
    alert('新しいパスワードを指定のアドレスへ送信しました。');
  }
  loading.value = false;
};
</script>

<template>
  <atoms-layout-container>
    <molecules-button-back text="ログイン画面へ戻る"></molecules-button-back>
    <v-card max-width="500" flat class="mx-auto pa-6 mt-6">
      <v-form v-model="formValid" @submit.prevent="reissuePassword()">
        <v-text-field
          v-model="reissuePasswordForm.email"
          type="email"
          name="email"
          :rules="[ruleRequired, ruleEmail]"
          label="メールアドレス"
          persistent-placeholder
          placeholder="abc@example.com"
        />
        <v-btn type="submit" block color="primary" flat size="x-large" :loading="loading" class="mt-6">
          新しいパスワードを発行する
        </v-btn>
      </v-form>
    </v-card>
  </atoms-layout-container>
</template>
