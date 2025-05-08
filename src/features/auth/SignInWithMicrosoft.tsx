'use client';

import { OAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { Button } from '@mui/material';
import Image from 'next/image';
import { signIn as signInByNextAuth } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { AuthErrorHandle } from './AuthErrorHandle';

export default function SignInWithMicrosoft() {
  const provider = new OAuthProvider('microsoft.com');
  provider.setCustomParameters({
    prompt: 'consent',
    tenantId: process.env.NEXT_PUBLIC_MICROSOFT_TENANT_ID ?? 'common',
  });
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const doSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      await signInByNextAuth('credentials', {
        idToken,
        callbackUrl: '/',
      });
    } catch (e) {
      setIsLoading(false);
      AuthErrorHandle(e as Error, enqueueSnackbar);
    }
  };

  return (
    <Button
      sx={{ height: '56px', width: '100%' }}
      variant="outlined"
      disabled={isLoading}
      loading={isLoading}
      onClick={doSignIn}
      startIcon={
        <Image
          src="/logo/microsoft.png"
          alt="Microsoft"
          width={20}
          height={20}
        />
      }
    >
      Microsoftアカウントでログイン
    </Button>
  );
}
