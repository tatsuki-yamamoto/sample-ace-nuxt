import type { FetchOptions } from 'ohmyfetch';
import { AuthInfo } from '~~/types/auth';

export const useCustomFetch = <T>(url: string, options?: FetchOptions) => {
  const { upsertAuthData, findAuthInfo, deleteAuthInfo } = useAuth();
  const { convertObjectKeyToSnakeFromCamel, convertObjectKeyToCamelFromSnake } = useCaseConverter();

  return useFetch<T>(url, {
    ...options,
    onRequest({ request, options }) {
      // APIのbaseURLを設定する
      const config = useRuntimeConfig();
      options.baseURL = config.public.apiBaseURL;

      // ローカルストレージの認証情報をリクエストヘッダーに設定する
      const authInfo = findAuthInfo();
      const headers = new Headers(options.headers);
      headers.set('access-token', authInfo['access-token'] ?? '');
      headers.set('client', authInfo.client ?? '');
      headers.set('uid', authInfo.uid ?? '');
      options.headers = headers;

      // オブジェクトのキーをキャメルケースからスネークケースに変換
      try {
        options.body = JSON.stringify(convertObjectKeyToSnakeFromCamel(options.body));
      } catch (e) {
        console.error(e);
      }
    },
    onRequestError({ request, options, error }) {
      alert('予期せぬエラーが発生しました。');
      console.error('[ERROR] useCustomFetch onRequestError', { request, options, error });
    },
    onResponse({ request, response, options }) {
      // オブジェクトのキーをスネークケースからキャメルケースに変換
      try {
        response._data = convertObjectKeyToCamelFromSnake(response._data);
      } catch (e) {
        console.error(e);
      }

      // APIから取得した認証情報をローカルストレージに設定する
      if (response.headers.get('access-token') && response.headers.get('client') && response.headers.get('uid')) {
        const authInfo: AuthInfo = {
          'access-token': response.headers.get('access-token'),
          client: response.headers.get('client'),
          uid: response.headers.get('uid'),
        };
        upsertAuthData(authInfo);
      }
    },
    onResponseError({ request, response, options }) {
      // オブジェクトのキーをスネークケースからキャメルケースに変換
      try {
        response._data = convertObjectKeyToCamelFromSnake(response._data);
      } catch (e) {
        console.error(e);
      }

      // ステータスごとの処理
      const status = response.status;
      if (status === 400) {
        // エラーメッセージを表示する
        if (response._data.message) alert(response._data.message);
      } else if (status >= 401 && status < 500) {
        if (status === 401 && !String(request).includes('/auth/')) {
          // 未認証のため認証情報を削除し、ログイン画面へ遷移
          deleteAuthInfo();
          navigateTo('/login');
          return;
        }
        const messages: string[] = response._data.errors?.full_messages ?? [];
        if (messages.length > 0) return alert(messages[0]);
        const errors: string[] = response._data.errors ?? [];
        if (errors.length > 0) return alert(errors[0]);
      } else if (status >= 500) {
        // サーバーエラー
        alert('システムエラーが発生しました。');
      } else {
        alert('予期せぬエラーが発生しました。');
        console.error('[ERROR] useCustomFetch onResponseError', { request, response, options });
      }
    },
  });
};
