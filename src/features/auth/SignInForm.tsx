'use client';
import { Box, Typography } from '@mui/material';
import SignInWithMicrosoft from './SignInWithMicrosoft';
import SignInWithDirect from './SignInWithDirect';

export default function SignInForm() {
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
        サインイン
      </Typography>

      <SignInWithDirect />
      <hr style={{ width: '100%', border: '1px solid #ccc' }} />
      <SignInWithMicrosoft />
    </Box>
  );
}
