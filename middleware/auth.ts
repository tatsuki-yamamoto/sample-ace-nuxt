export default defineNuxtRouteMiddleware(async () => {
  const { getValidateToken, authUserState } = useAuth();
  const { data, error } = await getValidateToken();
  if (error.value) {
    // 未認証または認証の有効期限切れのためログイン画面へ遷移
    // replaceで遷移
    return navigateTo('/login', { replace: true });
  } else if (data.value?.data) {
    // ユーザー情報をstateに設定
    authUserState.value = data.value.data;
  }
});
