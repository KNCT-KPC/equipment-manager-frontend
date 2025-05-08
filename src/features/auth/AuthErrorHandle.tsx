export function AuthErrorHandle(
  e: Error,
  enqueueSnackbar: (message: string, options: { variant: string }) => void,
) {
  let errorMessage = 'エラーが発生しました';

  if (e.message.includes('user-not-found')) {
    errorMessage = 'ユーザーが見つかりません';
  } else if (e.message.includes('too-many-requests')) {
    errorMessage =
      '試行回数が多すぎます。しばらく時間をおいて再度お試しください';
  } else if (e.message.includes('invalid-credential')) {
    errorMessage = '認証情報が正しくありません';
  } else if (e.message.includes('invalid-email')) {
    errorMessage = 'メールアドレスのフォーマットが正しくありません';
  } else if (e.message.includes('user-disabled')) {
    errorMessage = 'ユーザーが無効化されています';
  }

  enqueueSnackbar(errorMessage, { variant: 'error' });
}
