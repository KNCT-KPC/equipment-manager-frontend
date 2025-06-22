'use client';
import { SnackbarProvider } from 'notistack';

export default function NotistackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      {children}
    </SnackbarProvider>
  );
}
