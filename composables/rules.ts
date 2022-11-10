export const useFormRules = () => {
  return {
    ruleRequired: (v: any) => !!v || '必須です',
    ruleEmail: (value: any) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || 'メールアドレスの形式ではありません';
    },
    rulePassLen: (v: string) => (!!v && v.length >= 6) || 'パスワードは6文字以上である必要があります',
  };
};
