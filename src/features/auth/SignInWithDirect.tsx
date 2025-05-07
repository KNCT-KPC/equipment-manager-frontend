'use client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { signIn as signInByNextAuth } from 'next-auth/react';
import { auth } from '@/lib/firebase/client';
import { TextField, Button } from '@mui/material';
import { useSnackbar } from 'notistack';

export default function SignInWithDirect() {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    let isValid = true;

    if (!email) {
      setEmailError('メールアドレスを入力してください');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('パスワードを入力してください');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const signIn = async () => {
    if (!validateInputs()) return;
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const idToken = await userCredential.user.getIdToken();
      await signInByNextAuth('credentials', {
        idToken,
        callbackUrl: '/',
      });
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      let errorMessage = 'ログインに失敗しました';
      if (e instanceof Error) {
        if (e.message.includes('user-not-found')) {
          errorMessage = 'ユーザーが見つかりません';
        } else if (e.message.includes('too-many-requests')) {
          errorMessage =
            '試行回数が多すぎます。しばらく時間をおいて再度お試しください';
        } else if (e.message.includes('invalid-credential')) {
          errorMessage = '認証情報が正しくありません';
        } else if (e.message.includes('invalid-email')) {
          errorMessage = 'メールアドレスのフォーマットが正しくありません';
        }
      }
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  return (
    <>
      <TextField
        id="outlined-basic"
        label="メールアドレス"
        variant="outlined"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={!!emailError}
        helperText={emailError}
        sx={{ width: '100%' }}
      />
      <TextField
        id="outlined-basic"
        label="パスワード"
        variant="outlined"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={!!passwordError}
        helperText={passwordError}
        sx={{ width: '100%' }}
      />
      <Button
        variant="contained"
        onClick={signIn}
        disabled={isLoading}
        loading={isLoading}
        sx={{ height: '56px', width: '100%' }}
      >
        ログイン
      </Button>
    </>
  );
}
