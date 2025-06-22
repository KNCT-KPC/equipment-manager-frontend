import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import type { User } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

import { auth } from '@/lib/firebase/admin';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        idToken: { label: 'ID Token', type: 'text' },
      },
      authorize: async (credentials) => {
        const idToken = credentials?.idToken;
        if (idToken) {
          try {
            const decoded = await auth.verifyIdToken(idToken);
            return {
              id: decoded.uid,
              email: decoded.email,
              name: decoded.name,
            } as User;
          } catch (err) {
            console.error(err);
          }
        }
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
