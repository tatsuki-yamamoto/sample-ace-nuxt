<script lang="ts" setup>
const { ruleRequired, ruleEmail } = useFormRules();

const resendConfirmationEmailForm = reactive({
  email: '',
});
const loading = ref(false);
const { postAuthConfirmation } = useAuth();
const formValid = ref(false);
const resendConfirmationEmail = async () => {
  if (!formValid.value) return;
  loading.value = true;
  const { error } = await postAuthConfirmation({ ...resendConfirmationEmailForm });
  if (!error.value) {
    alert('確認メールを指定のアドレスへ再送信しました。');
  }
  loading.value = false;
};
</script>

<template>
  <atoms-layout-container>
    <molecules-button-back></molecules-button-back>
    <v-card max-width="500" flat class="mx-auto pa-6 mt-6">
      <v-form v-model="formValid" @submit.prevent="resendConfirmationEmail()">
        <v-text-field
          v-model="resendConfirmationEmailForm.email"
          type="email"
          name="email"
          :rules="[ruleRequired, ruleEmail]"
          label="メールアドレス"
          persistent-placeholder
          placeholder="abc@example.com"
        />
        <v-btn type="submit" block color="primary" flat size="x-large" :loading="loading" class="mt-6">
          確認メールを再送信する
        </v-btn>
      </v-form>
    </v-card>
  </atoms-layout-container>
</template>
