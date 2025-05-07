'use client';
import { useState } from 'react';
import { signOut as signOutByNextAuth } from 'next-auth/react';
import { auth } from '@/lib/firebase/client';
import { Button, Box, Typography } from '@mui/material';

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const signOut = async () => {
    setIsLoading(true);
    await auth.signOut();
    await signOutByNextAuth({ callbackUrl: '/auth/signin', redirect: true });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        maxWidth: {
          lg: '500px',
          md: '50%',
          sm: '70%',
          xs: '100%',
        },
        gap: 2,
        margin: '0 auto',
        paddingX: 4,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        サインアウト
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        以下のボタンを押すとサインアウトします。
      </Typography>
      <Button
        variant="contained"
        sx={{ height: '56px', width: '100%' }}
        onClick={() => signOut()}
        loading={isLoading}
      >
        サインアウト
      </Button>
    </Box>
  );
}
