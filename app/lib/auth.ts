
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Simple hardcoded user for demo
        if (credentials.email === 'seller@example.com' && credentials.password === 'sellerpass123') {
          return {
            id: '1',
            email: 'seller@example.com',
            name: 'AC Seller'
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
};
