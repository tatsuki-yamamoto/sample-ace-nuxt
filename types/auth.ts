// 認証情報
export type AuthInfo = {
  'access-token': string | null;
  client: string | null;
  uid: string | null;
};

// ユーザー
export type AuthUser = {
  id: number;
  email: string;
  uid: string;
  provider: string;
  lastName: string;
  firstName: string;
  allowPasswordChange: boolean;
};

// ユーザー登録リクエスト
export type RequestPostAuthSignUp = {
  email: string;
  lastName: string;
  firstName: string;
  password: string;
  passwordConfirmation: string;
};

// ログインリクエスト
export type RequestPostAuthSignIn = {
  email: string;
  password: string;
};

// パスワード再発行リクエスト
export type RequestPostAuthPassword = {
  email: string;
};

// パスワード再設定リクエスト
export type RequestPutAuthPassword = {
  password: string;
  passwordConfirmation: string;
  resetPasswordToken: string;
};

// トークン検証レスポンス
export type ResponseGetAuthValidateToken = {
  success: boolean;
  data: AuthUser;
};

// ユーザー更新リクエスト
export type RequestPutAuth = {
  email: string;
  lastName: string;
  firstName: string;
};

// ユーザー更新リクエスト（パスワード用）
export type RequestPutAuthForPassword = {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
};

// ユーザー更新レスポンス
export type ResponsePutAuth = {
  success: boolean;
  data: AuthUser;
};
