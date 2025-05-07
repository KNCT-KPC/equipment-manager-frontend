'use client';

import { OAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { Button } from '@mui/material';
import Image from 'next/image';

export default function SignInWithMicrosoft() {
  const provider = new OAuthProvider('microsoft.com');
  provider.setCustomParameters({
    prompt: 'consent',
  });

  const doSignIn = async () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <Button
      sx={{ height: '56px', width: '100%' }}
      variant="outlined"
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
