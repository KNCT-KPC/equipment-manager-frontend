export function AuthErrorHandle(
  e: Error,
  enqueueSnackbar: (message: string, options: { variant: string }) => void,
) {
  let errorMessage = 'エラーが発生しました';
  switch (e.message) {
    case 'auth/user-not-found':
      errorMessage = 'ユーザーが見つかりません';
      break;
    case 'auth/too-many-requests':
      errorMessage =
        '試行回数が多すぎます。しばらく時間をおいて再度お試しください';
      break;
    case 'auth/invalid-credential':
      errorMessage = '認証情報が正しくありません';
      break;
    case 'auth/invalid-email':
      errorMessage = 'メールアドレスのフォーマットが正しくありません';
      break;
    case 'auth/user-disabled':
      errorMessage = 'ユーザーが無効化されています';
      break;
    case 'auth/popup-closed-by-user':
      // 認証を取り消した場合は、インフォとして表示する
      enqueueSnackbar('認証を取り消しました', { variant: 'info' });
      return;
    default:
      console.error(e.message);
  }

  enqueueSnackbar(errorMessage, { variant: 'error' });
}
