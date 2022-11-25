import { Ref } from 'nuxt/dist/app/compat/capi';
import {
  AuthInfo,
  RequestPostAuthSignIn,
  RequestPostAuthPassword,
  RequestPutAuthPassword,
  RequestPostAuthSignUp,
  ResponseGetAuthValidateToken,
  AuthUser,
  RequestPutAuth,
  ResponsePutAuth,
  RequestPutAuthForPassword,
} from '~~/types/auth';

export const useAuth = () => {
  // ユーザー情報
  const authUserState = useState<AuthUser>('authUser', () => {
    return {
      email: '',
      provider: '',
      uid: '',
      id: 0,
      allowPasswordChange: false,
      lastName: '',
      firstName: '',
    };
  });

  // ユーザー情報登録
  const signUp = (requestPostAuthSignUp: RequestPostAuthSignUp) => {
    return useCustomFetch('/api/v1/auth', {
      method: 'POST',
      body: requestPostAuthSignUp,
    });
  };

  // サインイン
  const signIn = (requestPostAuthSignIn: RequestPostAuthSignIn) => {
    return useCustomFetch('/api/v1/auth/sign_in', {
      method: 'POST',
      body: requestPostAuthSignIn,
    });
  };

  // サインアウト
  const signOut = () => {
    return useCustomFetch('/api/v1/auth/sign_out', {
      method: 'DELETE',
    });
  };

  // パスワード再発行
  const postAuthPassword = (requestPostAuthPassword: RequestPostAuthPassword) => {
    return useCustomFetch('/api/v1/auth/password', {
      method: 'POST',
      body: requestPostAuthPassword,
    });
  };

  // パスワード再設定
  const putAuthPassword = (requestPutAuthPassword: RequestPutAuthPassword) => {
    return useCustomFetch('/api/v1/auth/password', {
      method: 'PUT',
      body: requestPutAuthPassword,
    });
  };

  // トークン検証
  const getValidateToken = () => {
    return useCustomFetch<ResponseGetAuthValidateToken>('/api/v1/auth/validate_token');
  };

  // ユーザー情報更新
  const putAuth = (requestPutAuth: RequestPutAuth) => {
    return useCustomFetch<ResponsePutAuth>('/api/v1/auth', {
      method: 'PUT',
      body: requestPutAuth,
    });
  };

  // ユーザー情報更新
  const putAuthForPassword = (requestPutAuthForPassword: RequestPutAuthForPassword) => {
    return useCustomFetch<ResponsePutAuth>('/api/v1/auth', {
      method: 'PUT',
      body: requestPutAuthForPassword,
    });
  };

  // 認証情報をローカルストレージに設定
  const upsertAuthData = (authInfo: AuthInfo) => {
    localStorage.setItem('access-token', authInfo['access-token'] ?? '');
    localStorage.setItem('client', authInfo.client ?? '');
    localStorage.setItem('uid', authInfo.uid ?? '');
  };

  // 認証情報をローカルストレージから取得
  const findAuthInfo = (): AuthInfo => {
    return {
      'access-token': localStorage.getItem('access-token') ?? '',
      client: localStorage.getItem('client') ?? '',
      uid: localStorage.getItem('uid') ?? '',
    };
  };

  // 認証情報をローカルストレージから削除
  const deleteAuthInfo = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');
  };

  return {
    authUserState,
    signUp,
    signIn,
    signOut,
    postAuthPassword,
    putAuthPassword,
    getValidateToken,
    putAuth,
    putAuthForPassword,
    upsertAuthData,
    findAuthInfo,
    deleteAuthInfo,
  };
};
